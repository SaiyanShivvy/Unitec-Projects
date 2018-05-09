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
    public partial class MainForm : Form
    {
        private DataModule DM;
        private CatForm frmCat;
        private OwnerForm frmOwner;
        private TreatmentForm frmTreatment;
        private VeterinarianForm frmVeterinarian;
        private VisitForm frmVisit;
        private VisitTreatmentForm frmVisitTreatment;
        private InvoiceForm frmInvoice;

        private void MainForm_Load(object sender, EventArgs e)
        {
            DM = new DataModule();
        }

        public MainForm()
        {
            InitializeComponent();
        }

        private void btnTreatment_Click(object sender, EventArgs e)
        {
            if (frmTreatment == null)
            {
                frmTreatment = new TreatmentForm(DM, this);
            }
            frmTreatment.ShowDialog();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
