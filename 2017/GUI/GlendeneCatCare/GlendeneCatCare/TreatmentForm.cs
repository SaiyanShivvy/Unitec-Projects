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
    public partial class TreatmentForm : Form
    {
        private DataModule DM;
        private MainForm frmMenu;
        private CurrencyManager currencyManager;

        public void BindControls()
        {
            lblTreatmentID.DataBindings.Add("Text", DM.dsGlendene, "Treatment.TreatmentID");
            txtDescription.DataBindings.Add("Text", DM.dsGlendene, "Treatment.Description");
            txtCost.DataBindings.Add("Text", DM.dsGlendene, "Treatment.Cost");
            lstTreatments.DataSource = DM.dsGlendene;
            lstTreatments.DisplayMember = "Treatment.Description";
            lstTreatments.ValueMember = "Treatment.Description";
            currencyManager = (CurrencyManager)this.BindingContext[DM.dsGlendene, "TREATMENT"];
        }

        public TreatmentForm(DataModule dm, MainForm mnu)
        {
            InitializeComponent();
            DM = dm;
            frmMenu = mnu;
            BindControls();
        }

        private void btnPrevious_Click(object sender, EventArgs e)
        {
            if (currencyManager.Position > 0)
            {
                --currencyManager.Position;
            }
        }

        private void btnNext_Click(object sender, EventArgs e)
        {
            if (currencyManager.Position < currencyManager.Count - 1)
            {
                ++currencyManager.Position;
            }
        }

        private void btnAddTreatment_Click(object sender, EventArgs e)
        {
            lblTreatmentID.Text = null;
            DataRow newTreatmentRow = DM.dtTreatment.NewRow();

            if ((txtDescription.Text == "") || (txtCost.Text == ""))
            {
                MessageBox.Show("You must type in a Treatment description and cost", "Cost");
            }
            else
            {
                newTreatmentRow["Description"] = txtDescription.Text;
                newTreatmentRow["Cost"] = Convert.ToDouble(txtCost.Text);
                DM.dtTreatment.Rows.Add(newTreatmentRow);
                MessageBox.Show("Treatment Added Successfully", "Success");
                DM.UpdateTreatment();
            }
        }

        private void btnDeleteTreatment_Click(object sender, EventArgs e)
        {
            DataRow deleteTreatmentRow = DM.dtTreatment.Rows[currencyManager.Position];
            DataRow[] VisitTreatmentRow = DM.dtVisitTreatment.Select("TreatmentID = " + lblTreatmentID.Text);
            if (VisitTreatmentRow.Length != 0)
            {
                MessageBox.Show("You may only delete Treatments that are not allocated to visits", "Error");
            }
            else
            {
                if (MessageBox.Show("Are you sure you want to delete this record?", "Warning", MessageBoxButtons.OKCancel) == DialogResult.OK)
                {
                    deleteTreatmentRow.Delete();
                    DM.UpdateTreatment();
                }
            }
        }

        private void btnUpdateTreatment_Click(object sender, EventArgs e)
        {
            DataRow updateTreatmentRow = DM.dtTreatment.Rows[currencyManager.Position];

            if ((txtDescription.Text == "") || (txtCost.Text == ""))
            {
                MessageBox.Show("You must type in a Treatment description and cost", "Error");
            }
            else
            {
                updateTreatmentRow["Description"] = txtDescription.Text;
                updateTreatmentRow["Cost"] = Convert.ToDouble(txtCost.Text);
                currencyManager.EndCurrentEdit();
                DM.UpdateTreatment();
                MessageBox.Show("Treatment updated successfully", "Success");
            }
        }

        private void btnReturn_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
