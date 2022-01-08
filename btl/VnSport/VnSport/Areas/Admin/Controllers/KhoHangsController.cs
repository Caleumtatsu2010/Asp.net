using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VnSport.Models;

namespace VnSport.Areas.Admin.Controllers
{
    public class KhoHangsController : Controller
    {
        private vnsport db = new vnsport();

        // GET: Admin/KhoHangs
        public ActionResult Index()
        {
            var khoHangs = db.KhoHangs.Include(k => k.SanPham);
            return View(khoHangs.ToList());
        }

        // GET: Admin/KhoHangs/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhoHang khoHang = db.KhoHangs.Find(id);
            if (khoHang == null)
            {
                return HttpNotFound();
            }
            return View(khoHang);
        }

        // GET: Admin/KhoHangs/Create
        public ActionResult Create()
        {
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham");
            return View();
        }

        // POST: Admin/KhoHangs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "maSanPham,soLuongTon,ghiChu")] KhoHang khoHang)
        {
            if (ModelState.IsValid)
            {
                db.KhoHangs.Add(khoHang);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", khoHang.maSanPham);
            return View(khoHang);
        }

        // GET: Admin/KhoHangs/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhoHang khoHang = db.KhoHangs.Find(id);
            if (khoHang == null)
            {
                return HttpNotFound();
            }
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", khoHang.maSanPham);
            return View(khoHang);
        }

        // POST: Admin/KhoHangs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "maSanPham,soLuongTon,ghiChu")] KhoHang khoHang)
        {
            if (ModelState.IsValid)
            {
                db.Entry(khoHang).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", khoHang.maSanPham);
            return View(khoHang);
        }

        // GET: Admin/KhoHangs/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KhoHang khoHang = db.KhoHangs.Find(id);
            if (khoHang == null)
            {
                return HttpNotFound();
            }
            return View(khoHang);
        }

        // POST: Admin/KhoHangs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            KhoHang khoHang = db.KhoHangs.Find(id);
            db.KhoHangs.Remove(khoHang);
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
