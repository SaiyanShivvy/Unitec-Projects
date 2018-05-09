namespace GlendeneCatCare
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.grpMaintenance = new System.Windows.Forms.GroupBox();
            this.btnTreatmentVisit = new System.Windows.Forms.Button();
            this.btnVisit = new System.Windows.Forms.Button();
            this.btnTreatment = new System.Windows.Forms.Button();
            this.btnCat = new System.Windows.Forms.Button();
            this.btnVeterinarian = new System.Windows.Forms.Button();
            this.btnOwner = new System.Windows.Forms.Button();
            this.grpReport = new System.Windows.Forms.GroupBox();
            this.btnExit = new System.Windows.Forms.Button();
            this.btnInvoices = new System.Windows.Forms.Button();
            this.grpMaintenance.SuspendLayout();
            this.grpReport.SuspendLayout();
            this.SuspendLayout();
            // 
            // grpMaintenance
            // 
            this.grpMaintenance.Controls.Add(this.btnTreatmentVisit);
            this.grpMaintenance.Controls.Add(this.btnVisit);
            this.grpMaintenance.Controls.Add(this.btnTreatment);
            this.grpMaintenance.Controls.Add(this.btnCat);
            this.grpMaintenance.Controls.Add(this.btnVeterinarian);
            this.grpMaintenance.Controls.Add(this.btnOwner);
            this.grpMaintenance.Location = new System.Drawing.Point(24, 13);
            this.grpMaintenance.Name = "grpMaintenance";
            this.grpMaintenance.Size = new System.Drawing.Size(241, 369);
            this.grpMaintenance.TabIndex = 0;
            this.grpMaintenance.TabStop = false;
            this.grpMaintenance.Text = "Maintenance";
            // 
            // btnTreatmentVisit
            // 
            this.btnTreatmentVisit.Location = new System.Drawing.Point(35, 312);
            this.btnTreatmentVisit.Name = "btnTreatmentVisit";
            this.btnTreatmentVisit.Size = new System.Drawing.Size(161, 23);
            this.btnTreatmentVisit.TabIndex = 5;
            this.btnTreatmentVisit.Text = "Allocate Treatment to Visit";
            this.btnTreatmentVisit.UseVisualStyleBackColor = true;
            // 
            // btnVisit
            // 
            this.btnVisit.Location = new System.Drawing.Point(35, 256);
            this.btnVisit.Name = "btnVisit";
            this.btnVisit.Size = new System.Drawing.Size(161, 23);
            this.btnVisit.TabIndex = 4;
            this.btnVisit.Text = "Visit Treatment";
            this.btnVisit.UseVisualStyleBackColor = true;
            // 
            // btnTreatment
            // 
            this.btnTreatment.Location = new System.Drawing.Point(35, 201);
            this.btnTreatment.Name = "btnTreatment";
            this.btnTreatment.Size = new System.Drawing.Size(161, 23);
            this.btnTreatment.TabIndex = 3;
            this.btnTreatment.Text = "Treatment Maintenance";
            this.btnTreatment.UseVisualStyleBackColor = true;
            this.btnTreatment.Click += new System.EventHandler(this.btnTreatment_Click);
            // 
            // btnCat
            // 
            this.btnCat.Location = new System.Drawing.Point(35, 146);
            this.btnCat.Name = "btnCat";
            this.btnCat.Size = new System.Drawing.Size(161, 23);
            this.btnCat.TabIndex = 2;
            this.btnCat.Text = "Cat Maintenance";
            this.btnCat.UseVisualStyleBackColor = true;
            // 
            // btnVeterinarian
            // 
            this.btnVeterinarian.Location = new System.Drawing.Point(35, 93);
            this.btnVeterinarian.Name = "btnVeterinarian";
            this.btnVeterinarian.Size = new System.Drawing.Size(161, 23);
            this.btnVeterinarian.TabIndex = 1;
            this.btnVeterinarian.Text = "Veterinarian Maintenance";
            this.btnVeterinarian.UseVisualStyleBackColor = true;
            // 
            // btnOwner
            // 
            this.btnOwner.Location = new System.Drawing.Point(35, 42);
            this.btnOwner.Name = "btnOwner";
            this.btnOwner.Size = new System.Drawing.Size(161, 23);
            this.btnOwner.TabIndex = 0;
            this.btnOwner.Text = "Owner Maintenance";
            this.btnOwner.UseVisualStyleBackColor = true;
            // 
            // grpReport
            // 
            this.grpReport.Controls.Add(this.btnExit);
            this.grpReport.Controls.Add(this.btnInvoices);
            this.grpReport.Location = new System.Drawing.Point(308, 13);
            this.grpReport.Name = "grpReport";
            this.grpReport.Size = new System.Drawing.Size(257, 369);
            this.grpReport.TabIndex = 1;
            this.grpReport.TabStop = false;
            this.grpReport.Text = "Reporting";
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(48, 312);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(161, 23);
            this.btnExit.TabIndex = 7;
            this.btnExit.Text = "Exit";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // btnInvoices
            // 
            this.btnInvoices.Location = new System.Drawing.Point(48, 42);
            this.btnInvoices.Name = "btnInvoices";
            this.btnInvoices.Size = new System.Drawing.Size(161, 23);
            this.btnInvoices.TabIndex = 6;
            this.btnInvoices.Text = "Invoices";
            this.btnInvoices.UseVisualStyleBackColor = true;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(598, 408);
            this.Controls.Add(this.grpReport);
            this.Controls.Add(this.grpMaintenance);
            this.Name = "MainForm";
            this.Text = "Main Menu";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.grpMaintenance.ResumeLayout(false);
            this.grpReport.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox grpMaintenance;
        private System.Windows.Forms.Button btnTreatmentVisit;
        private System.Windows.Forms.Button btnVisit;
        private System.Windows.Forms.Button btnTreatment;
        private System.Windows.Forms.Button btnCat;
        private System.Windows.Forms.Button btnVeterinarian;
        private System.Windows.Forms.Button btnOwner;
        private System.Windows.Forms.GroupBox grpReport;
        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.Button btnInvoices;
    }
}

