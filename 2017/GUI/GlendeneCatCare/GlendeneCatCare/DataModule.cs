using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GlendeneCatCare
{
    public partial class DataModule : Form
    {
        public DataTable dtCat;
        public DataTable dtOwner;
        public DataTable dtVeterinarian;
        public DataTable dtTreatment;
        public DataTable dtVisit;
        public DataTable dtVisitTreatment;
        public DataView catView;
        public DataView treatmentView;
        public DataView ownerView;
        public DataView veterinarinView;
        public DataView visitView;
        public DataView visitTreatmentView;

        public DataModule()
        {
            InitializeComponent();
            dsGlendene.EnforceConstraints = false;
            daCat.Fill(dsGlendene);
            daTreatment.Fill(dsGlendene);
            daOwner.Fill(dsGlendene);
            daVeterinarian.Fill(dsGlendene);
            daVisit.Fill(dsGlendene);
            daVisitTreatment.Fill(dsGlendene);
            dtCat = dsGlendene.Tables["Cat"];
            dtTreatment = dsGlendene.Tables["Treatment"];
            dtOwner = dsGlendene.Tables["Owner"];
            dtVeterinarian = dsGlendene.Tables["Veterinarian"];
            dtVisit = dsGlendene.Tables["Visit"];
            dtVisitTreatment = dsGlendene.Tables["VisitTreatment"];
            dsGlendene.EnforceConstraints = true;
        }

        public void UpdateTreatment()
        {
            daTreatment.Update(dtTreatment);
        }
    }
}
