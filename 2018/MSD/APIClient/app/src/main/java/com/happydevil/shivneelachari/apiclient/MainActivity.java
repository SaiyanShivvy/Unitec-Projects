package com.happydevil.shivneelachari.apiclient;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

public class MainActivity extends AppCompatActivity {
    RequestQueue queue = null;

    public RequestQueue getRequestQueue(Context context)
    {
        if(queue == null)
        {
            queue = Volley.newRequestQueue(this);
        }

        return queue;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        RequestQueue q = Volley.newRequestQueue(getApplicationContext());
        queue = getRequestQueue(getApplicationContext());

        final TextView output = (TextView) findViewById(R.id.tVJSON);
        final Button request = (Button) findViewById(R.id.btnRequest);
        final ImageView image = (ImageView) findViewById(R.id.imageViewItem);

        request.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Log.e("POSTMAN", "Request Sent!");
                output.setText("Request Sent");
                //API URL - TheCatAPI
                String url = "https://api.thecatapi.com/v1/images/search";
                JsonArrayRequest catReq = new JsonArrayRequest(url, new Response.Listener<JSONArray>()
                {
                    public void onResponse(JSONArray response) {
                        Log.e("POSTMAN", "Res: "+ response.toString());
                        // Parsing json
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                JSONObject obj = response.getJSONObject(i);
                                String imgURL = obj.getString("url");
                                Log.e("POSTMAN", "Image URL: "+ imgURL);
                                output.setText(response.toString());
                                Picasso.get().load(imgURL).into(image);
                            } catch (JSONException e) {
                                e.printStackTrace();
                                Toast.makeText(getApplicationContext(), "Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        output.setText("That didn't work!");
                    }
                });

                // Add the request to the RequestQueue.
                queue.add(catReq);
            }
        });
    }
}
