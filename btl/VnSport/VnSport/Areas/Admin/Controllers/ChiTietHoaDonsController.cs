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
    public class ChiTietHoaDonsController : Controller
    {
        private vnsport db = new vnsport();

        // GET: Admin/ChiTietHoaDons
        public ActionResult Index()
        {
            var chiTietHoaDons = db.ChiTietHoaDons.Include(c => c.HoaDon).Include(c => c.SanPham);
            return View(chiTietHoaDons.ToList());
        }

        // GET: Admin/ChiTietHoaDons/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChiTietHoaDon chiTietHoaDon = db.ChiTietHoaDons.Find(id);
            if (chiTietHoaDon == null)
            {
                return HttpNotFound();
            }
            return View(chiTietHoaDon);
        }

        // GET: Admin/ChiTietHoaDons/Create
        public ActionResult Create()
        {
            ViewBag.maHoaDon = new SelectList(db.HoaDons, "maHoaDon", "hinhThucThanhToan");
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham");
            return View();
        }

        // POST: Admin/ChiTietHoaDons/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "maChiTietHoaDon,maSanPham,soLuong,donGia,maHoaDon")] ChiTietHoaDon chiTietHoaDon)
        {
            if (ModelState.IsValid)
            {
                db.ChiTietHoaDons.Add(chiTietHoaDon);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.maHoaDon = new SelectList(db.HoaDons, "maHoaDon", "hinhThucThanhToan", chiTietHoaDon.maHoaDon);
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", chiTietHoaDon.maSanPham);
            return View(chiTietHoaDon);
        }

        // GET: Admin/ChiTietHoaDons/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChiTietHoaDon chiTietHoaDon = db.ChiTietHoaDons.Find(id);
            if (chiTietHoaDon == null)
            {
                return HttpNotFound();
            }
            ViewBag.maHoaDon = new SelectList(db.HoaDons, "maHoaDon", "hinhThucThanhToan", chiTietHoaDon.maHoaDon);
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", chiTietHoaDon.maSanPham);
            return View(chiTietHoaDon);
        }

        // POST: Admin/ChiTietHoaDons/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "maChiTietHoaDon,maSanPham,soLuong,donGia,maHoaDon")] ChiTietHoaDon chiTietHoaDon)
        {
            if (ModelState.IsValid)
            {
                db.Entry(chiTietHoaDon).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.maHoaDon = new SelectList(db.HoaDons, "maHoaDon", "hinhThucThanhToan", chiTietHoaDon.maHoaDon);
            ViewBag.maSanPham = new SelectList(db.SanPhams, "maSanPham", "tenSanPham", chiTietHoaDon.maSanPham);
            return View(chiTietHoaDon);
        }

        // GET: Admin/ChiTietHoaDons/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ChiTietHoaDon chiTietHoaDon = db.ChiTietHoaDons.Find(id);
            if (chiTietHoaDon == null)
            {
                return HttpNotFound();
            }
            return View(chiTietHoaDon);
        }

        // POST: Admin/ChiTietHoaDons/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ChiTietHoaDon chiTietHoaDon = db.ChiTietHoaDons.Find(id);
            db.ChiTietHoaDons.Remove(chiTietHoaDon);
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
