using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;
using TravelTour.Models;

namespace TravelTour.Areas.Admin.Controllers
{
    public class ToursController : Controller
    {
        private travel db = new travel();

        // GET: Admin/Tours
        public ActionResult Index()
        {
            var tours = db.Tours.Include(t => t.TourCategory);
            return View(tours.ToList());
        }

        [HttpPost]
        public ActionResult ExportToExcel()
        {
            var gv = new GridView();
            gv.DataSource = this.db.Tours
                .Select(r => new {
                    Ids = r.TourCode,
                    Names = r.Name,
                    Slots = r.Slot,
                    Times = r.DeptTime,
                    Days = r.Day,
                    Vehicles = r.Vehicle,
                    Destinations = r.Destination
                })
                .OrderByDescending(p => p.Ids)
                .ToList();
            gv.DataBind();
            Response.Clear();
            Response.Buffer = true;
            //Response.AddHeader("content-disposition",
            // "attachment;filename=GridViewExport.xls");
            Response.Charset = "utf-8";
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.AddHeader("content-disposition", "attachment;filename=GridViewExport.xls");
            //Mã hóa chữa sang UTF8
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.BinaryWrite(System.Text.Encoding.UTF8.GetPreamble());

            StringWriter sw = new StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(sw);

            for (int i = 0; i < gv.Rows.Count; i++)
            {
                //Apply text style to each Row
                gv.Rows[i].Attributes.Add("class", "textmode");
            }
            //Add màu nền cho header của file excel
            gv.HeaderRow.BackColor = System.Drawing.Color.DarkBlue;
            //Màu chữ cho header của file excel
            gv.HeaderStyle.ForeColor = System.Drawing.Color.White;

            gv.HeaderRow.Cells[0].Text = "Mã tour";
            gv.HeaderRow.Cells[1].Text = "Tên tour";
            gv.HeaderRow.Cells[2].Text = "Slot";
            gv.HeaderRow.Cells[3].Text = "Thời gian";
            gv.HeaderRow.Cells[4].Text = "Day";
            gv.HeaderRow.Cells[5].Text = "Phương tiện";
            gv.HeaderRow.Cells[6].Text = "Destination";
            gv.RenderControl(hw);

            Response.Output.Write(sw.ToString());
            Response.Flush();
            Response.End();
            var model = db.Tours
                .OrderByDescending(p => p.TourCode)
                .ToList();
            return View("View", model);
        }

        // GET: Admin/Tours/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tour tour = db.Tours.Find(id);
            if (tour == null)
            {
                return HttpNotFound();
            }
            return View(tour);
        }

        // GET: Admin/Tours/Create
        public ActionResult Create()
        {
            ViewBag.TourCategoryCode = new SelectList(db.TourCategories, "TourCategoryCode", "CategoryName");
            return View();
        }

        // POST: Admin/Tours/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TourCode,Name,Detail,Slot,DeptTime,Day,Vehicle,Destination,Image1,Image2,TourCategoryCode,oldPrice,newPrice")] Tour tour)
        {
            if (ModelState.IsValid)
            {
                tour.Image1 = "";
                var f = Request.Files["ImageFile"];
                if (f != null && f.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f.SaveAs(UploadPath);
                    tour.Image1 = FileName;
                }

                tour.Image2 = "";
                var f2 = Request.Files["ImageFile2"];
                if (f2 != null && f2.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f2.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f2.SaveAs(UploadPath);
                    tour.Image2 = FileName;
                }

                db.Tours.Add(tour);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.TourCategoryCode = new SelectList(db.TourCategories, "TourCategoryCode", "CategoryName", tour.TourCategoryCode);
            return View(tour);
        }

        // GET: Admin/Tours/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tour tour = db.Tours.Find(id);
            if (tour == null)
            {
                return HttpNotFound();
            }
            ViewBag.TourCategoryCode = new SelectList(db.TourCategories, "TourCategoryCode", "CategoryName", tour.TourCategoryCode);
            return View(tour);
        }

        // POST: Admin/Tours/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "TourCode,Name,Detail,Slot,DeptTime,Day,Vehicle,Destination,Image1,Image2,TourCategoryCode,oldPrice,newPrice")] Tour tour)
        {
            if (ModelState.IsValid)
            {
                tour.Image1 = "";
                var f = Request.Files["ImageFile"];
                if (f != null && f.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f.SaveAs(UploadPath);
                    tour.Image1 = FileName;
                }


                tour.Image2 = "";
                var f2 = Request.Files["ImageFile2"];
                if (f2 != null && f2.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f2.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f2.SaveAs(UploadPath);
                    tour.Image2 = FileName;
                }

                db.Entry(tour).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.TourCategoryCode = new SelectList(db.TourCategories, "TourCategoryCode", "CategoryName", tour.TourCategoryCode);
            return View(tour);
        }

        // GET: Admin/Tours/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tour tour = db.Tours.Find(id);
            if (tour == null)
            {
                return HttpNotFound();
            }
            return View(tour);
        }

        // POST: Admin/Tours/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tour tour = db.Tours.Find(id);
            db.Tours.Remove(tour);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
