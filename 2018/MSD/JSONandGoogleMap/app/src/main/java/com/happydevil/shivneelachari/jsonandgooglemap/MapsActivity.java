package com.happydevil.shivneelachari.jsonandgooglemap;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Looper;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    LocationRequest mLocationRequest;
    FusedLocationProviderClient mFusedLocationClient;
    Marker mCurrLocationMarker;
    RequestQueue queue = null;

    public RequestQueue getRequestQueue(Context context) {
        if (queue == null) {
            queue = Volley.newRequestQueue(this);
        }

        return queue;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        mFusedLocationClient.getLastLocation().addOnSuccessListener(new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(Location location) {
                apiRequest(mMap, mFusedLocationClient, location);
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
        //stop location updates when Activity is no longer active
        if (mFusedLocationClient != null) {
            mFusedLocationClient.removeLocationUpdates(mLocationCallback);
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(60000); // one minute interval
        mLocationRequest.setFastestInterval(10000); // 10 sec
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                //Location Permission already granted
                mFusedLocationClient.requestLocationUpdates(mLocationRequest, mLocationCallback, Looper.myLooper());
                googleMap.setMyLocationEnabled(true);
        }
        else {
            // Do Nothing
        }
    }

    LocationCallback mLocationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult locationResult) {
            List<Location> locationList = locationResult.getLocations();
            if (locationList.size() > 0) {
                //The last location in the list is the newest
                Location location = locationList.get(locationList.size() - 1);
                Log.i("MapsActivity", "Location: " + location.getLatitude() + " " + location.getLongitude());

                if (mCurrLocationMarker != null) {
                    mCurrLocationMarker.remove();
                    apiRequest(mMap, mFusedLocationClient, location);
                }

                //Place current location marker
                LatLng latLng = new LatLng(location.getLatitude(), location.getLongitude());
                MarkerOptions markerOptions = new MarkerOptions();
                markerOptions.position(latLng);
                markerOptions.title("Current Position");
                markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_MAGENTA));
                mCurrLocationMarker = mMap.addMarker(markerOptions);
                //move map camera
                //mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, 15));
            }
        }
    };

    // Google Volley Stuff
    public void apiRequest(GoogleMap googleMap, FusedLocationProviderClient mFusedLocationClient, Location location) {
        RequestQueue rq = Volley.newRequestQueue(getApplicationContext());

        queue = getRequestQueue(getApplicationContext());

        final String url = "https://developers.zomato.com/api/v2.1/geocode?lat="+location.getLatitude()+"&lon="+location.getLongitude();
        //JsonArrayRequest apiReq = new JsonArrayRequest(url, new Listener<JSONArray>()
        JsonObjectRequest apiReq = new JsonObjectRequest(Request.Method.GET, url, null, new Listener<JSONObject>()
        {
            public void onResponse(JSONObject response) {
                //Log.d("POSTMAN", "Res: "+ response.toString());
                // Parsing JSON
                try {
                    response.names();
                    JSONArray nearbyRestaurants = response.getJSONArray("nearby_restaurants");
                    //Log.i("ZOMATO", nearbyRestaurants.toString());
                    for (int i = 0; i < nearbyRestaurants.length(); i++){
                        JSONObject restaurants = nearbyRestaurants.getJSONObject(i);
                        //Log.v("ZOMATO", restaurants.toString());
                        for (int j = 0; j < restaurants.length(); j++){
                            JSONObject restaurant = restaurants.getJSONObject("restaurant");
                            //Log.v("ZOMATO", restaurant.toString());
                            String id = restaurant.getString("id");
                            String name = restaurant.getString("name");
                            String cuisines = restaurant.getString("cuisines");
                            //Log.v("ZOMATO", "RID: "+id+", Name: "+name);

                            JSONObject rLocation = restaurant.getJSONObject("location");
                            //Log.v("ZOMATO", rLocation.toString());
                            Double rLat = rLocation.getDouble("latitude");
                            Double rLng = rLocation.getDouble("longitude");
                            //Log.v("ZOMATO", rLat+","+rLng);

                            // Call function to place a marker at restaurant location.
                            createMarker(rLat, rLng, name, cuisines);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(getApplicationContext(), "Error: "+e.getMessage(), Toast.LENGTH_LONG).show();
                    Log.e("ZOMATO", e.getMessage());
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                //Show Warning
                Toast.makeText(getApplicationContext(), "Error Something went wrong", Toast.LENGTH_LONG).show();
                Log.e("POSTMAN", error.toString());
            }
        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Accept", "application/json");
                headers.put("user-key", getResources().getString(R.string.zomato_user_key));
                return headers;
            }
        };

        // Add the request to the RequestQueue.
        queue.add(apiReq);
    }

    protected Marker createMarker(double latitude, double longitude, String name, String snippet){
        return mMap.addMarker(new MarkerOptions()
        .position(new LatLng(latitude, longitude))
        .anchor(0.5f, 0.5f)
        .title(name)
        .snippet("Serves: "+ snippet + " Cuisine(s)."));
    }


}
