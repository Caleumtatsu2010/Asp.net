using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication9.Models;

namespace WebApplication9.Controllers
{
    public class HangsController : Controller
    {
        private Model1 db = new Model1();

        // GET: Hangs
        public ActionResult Index()
        {
            var hangs = db.Hangs.Include(h => h.Nha_CC);
            return View(hangs.ToList());
        }

        // GET: Hangs/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hang hang = db.Hangs.Find(id);
            if (hang == null)
            {
                return HttpNotFound();
            }
            return View(hang);
        }

        // GET: Hangs/Create
        public ActionResult Create()
        {
            ViewBag.MaNCC = new SelectList(db.Nha_CC, "MaNCC", "TenNCC");
            return View();
        }

        // POST: Hangs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MaHang,MaNCC,TenHang,Gia,LuongCo,MoTa,ChietKhau,HinhAnh")] Hang hang)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    hang.HinhAnh = "";
                    var f = Request.Files["ImageFile"];
                    if(f!=null && f.ContentLength>0)
                    {
                        string FileName = System.IO.Path.GetFileName(f.FileName);
                        string UploadPath = Server.MapPath("~/wwwroot/" + FileName);
                        f.SaveAs(UploadPath);
                        hang.HinhAnh = FileName;
                    }
                    db.Hangs.Add(hang);
                    db.SaveChanges();

                }
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ViewBag.Error = "Loi nhap du lieu " + ex.Message;
                ViewBag.MaNCC = new SelectList(db.Nha_CC, "MaNCC", "TenNCC", hang.MaNCC);
                return View(hang);
            }

        }

        // GET: Hangs/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hang hang = db.Hangs.Find(id);
            if (hang == null)
            {
                return HttpNotFound();
            }
            //ViewBag.MaNCC = new SelectList(db.Nha_CC, "MaNCC", "TenNCC", hang.MaNCC);
            return View(hang);
        }

        // POST: Hangs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MaHang,MaNCC,TenHang,Gia,LuongCo,MoTa,ChietKhau,HinhAnh")] Hang hang)
        {try
            {


                if (ModelState.IsValid)
                {
                    hang.HinhAnh = "";
                    var f = Request.Files["ImageFile"];
                    if (f != null && f.ContentLength > 0)
                    {
                        string FileName = System.IO.Path.GetFileName(f.FileName);
                        string UploadPath = Server.MapPath("~/wwwroot/" + FileName);
                        f.SaveAs(UploadPath);
                        hang.HinhAnh = FileName;
                    }
                    db.Entry(hang).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ViewBag.Error = "Lỗi Sửa Dữ Liệu " + ex.Message;
                //ViewBag.MaNCC = new SelectList(db.Nha_CC, "MaNCC", "TenNCC", hang.MaNCC);
                ViewBag.MaNCC = new SelectList(db.Nha_CC, "MaNCC", "TenNCC", hang.MaNCC);
                return View(hang);
            }
            
        }

        // GET: Hangs/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Hang hang = db.Hangs.Find(id);
            if (hang == null)
            {
                return HttpNotFound();
            }
            return View(hang);
        }

        // POST: Hangs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Hang hang = db.Hangs.Find(id);
            try
            {
                db.Hangs.Remove(hang);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch(Exception ex)
            {
                ViewBag.Error = "Không xóa được bản ghi này " + ex.Message;
                return View("Delete", hang);
            }
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
