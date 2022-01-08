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
    public class SanPhamsController : Controller
    {
        private vnsport db = new vnsport();

        // GET: Admin/SanPhams
        public ActionResult Index()
        {
            var sanPhams = db.SanPhams.Include(s => s.KhoHang).Include(s => s.LoaiSanPham);
            return View(sanPhams.ToList());
        }

        // GET: Admin/SanPhams/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SanPham sanPham = db.SanPhams.Find(id);
            if (sanPham == null)
            {
                return HttpNotFound();
            }
            return View(sanPham);
        }

        // GET: Admin/SanPhams/Create
        public ActionResult Create()
        {
            ViewBag.maSanPham = new SelectList(db.KhoHangs, "maSanPham", "ghiChu");
            ViewBag.maLoai = new SelectList(db.LoaiSanPhams, "maLoai", "loaiSanPham1");
            return View();
        }

        // POST: Admin/SanPhams/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "maSanPham,tenSanPham,mau,kichThuoc,chatLieu,thuongHieu,gioiThieu,moTa,giaCu,giaMoi,anh1,anh2,anh3,maLoai")] SanPham sanPham)
        {
            if (ModelState.IsValid)
            {
                sanPham.anh1 = "";
                var f = Request.Files["ImageFile"];
                if (f != null && f.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f.SaveAs(UploadPath);
                    sanPham.anh1 = FileName;
                }

                sanPham.anh2 = "";
                var f2 = Request.Files["ImageFile2"];
                if (f2 != null && f2.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f2.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f2.SaveAs(UploadPath);
                    sanPham.anh2 = FileName;
                }

                sanPham.anh3 = "";
                var f3 = Request.Files["ImageFile3"];
                if (f3 != null && f3.ContentLength > 0)
                {
                    string FileName = System.IO.Path.GetFileName(f3.FileName);
                    string UploadPath = Server.MapPath("~/image/" + FileName);
                    f3.SaveAs(UploadPath);
                    sanPham.anh3 = FileName;
                }



                db.SanPhams.Add(sanPham);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.maSanPham = new SelectList(db.KhoHangs, "maSanPham", "ghiChu", sanPham.maSanPham);
            ViewBag.maLoai = new SelectList(db.LoaiSanPhams, "maLoai", "loaiSanPham1", sanPham.maLoai);
            return View(sanPham);
        }

        // GET: Admin/SanPhams/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SanPham sanPham = db.SanPhams.Find(id);
            if (sanPham == null)
            {
                return HttpNotFound();
            }
            ViewBag.maSanPham = new SelectList(db.KhoHangs, "maSanPham", "ghiChu", sanPham.maSanPham);
            ViewBag.maLoai = new SelectList(db.LoaiSanPhams, "maLoai", "loaiSanPham1", sanPham.maLoai);
            return View(sanPham);
        }

        // POST: Admin/SanPhams/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "maSanPham,tenSanPham,mau,kichThuoc,chatLieu,thuongHieu,gioiThieu,moTa,giaCu,giaMoi,anh1,anh2,anh3,maLoai")] SanPham sanPham)
        {

            //if (ModelState.IsValid)
            //{
            //    db.Entry(thongTinKhachHang).State = EntityState.Modified;
            //    db.SaveChanges();
            //    return RedirectToAction("Index");
            //}
            //ViewBag.tenDangNhap = new SelectList(db.TaiKhoans, "tenDangNhap", "matKhau", thongTinKhachHang.tenDangNhap);
            //return View(thongTinKhachHang);


            if (ModelState.IsValid)
            {

                db.Entry(sanPham).State = EntityState.Modified; 
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.maSanPham = new SelectList(db.KhoHangs, "maSanPham", "ghiChu", sanPham.maSanPham);
            ViewBag.maLoai = new SelectList(db.LoaiSanPhams, "maLoai", "loaiSanPham1", sanPham.maLoai);
            return View(sanPham);
        }

        // GET: Admin/SanPhams/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SanPham sanPham = db.SanPhams.Find(id);
            if (sanPham == null)
            {
                return HttpNotFound();
            }
            return View(sanPham);
        }

        // POST: Admin/SanPhams/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            SanPham sanPham = db.SanPhams.Find(id);
            db.SanPhams.Remove(sanPham);
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
