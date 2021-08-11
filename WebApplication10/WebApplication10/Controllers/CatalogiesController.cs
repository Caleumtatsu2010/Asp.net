﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication10.Models;
using PagedList;

namespace WebApplication10.Controllers
{
    public class CatalogiesController : Controller
    {
        private WineStoreModel1 db = new WineStoreModel1();

        // GET: Catalogies
        public ActionResult Index()
        {

            var catalogies = db.Catalogies.ToList();
            ViewBag.ListCatalogy = catalogies;
            var products = db.Products.ToList();
            ViewBag.ListProduct = products;
            return View();
        }
        //phan trang don gian
        public ActionResult Display(int? page)
        {
            var danhmuc = db.Catalogies.Select(s => s);
            //sap xep truoc khi phan trang
            danhmuc = danhmuc.OrderBy(s => s.CatalogyID);
            int pageSize = 3;//kich thuoc trang
            int pageNumber = (page ?? 1);//neu page = null thi tra bang 1
            return View(danhmuc.ToPagedList(pageNumber, pageSize));
        }

        // GET: Catalogies/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catalogy catalogy = db.Catalogies.Find(id); 
            if (catalogy == null)
            {
                return HttpNotFound();
            }
            return View(catalogy);
        }

        // GET: Catalogies/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Catalogies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CatalogyID,CatalogyName,Description")] Catalogy catalogy)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Catalogies.Add(catalogy);
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            catch(Exception ex)
            {
                ViewBag.Error = "Lỗi nhập dữ liệu ! " + ex.Message;
                return View(catalogy);
            }

        }

        // GET: Catalogies/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catalogy catalogy = db.Catalogies.Find(id);
            if (catalogy == null)
            {
                return HttpNotFound();
            }
            return View(catalogy);
        }

        // POST: Catalogies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CatalogyID,CatalogyName,Description")] Catalogy catalogy)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(catalogy).State = EntityState.Modified;
                    db.SaveChanges();

                }
                return RedirectToAction("Index");
            }
            catch(Exception ex)
            {
                ViewBag.Error = "Không sửa được bản ghi này !" + ex.Message;
                return View(catalogy);
            }


        }

        // GET: Catalogies/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Catalogy catalogy = db.Catalogies.Find(id);
            if (catalogy == null)
            {
                return HttpNotFound();
            }
            return View(catalogy);
        }

        // POST: Catalogies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Catalogy catalogy = db.Catalogies.Find(id);
            try
            {
                db.Catalogies.Remove(catalogy);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch(Exception ex)
            {
                ViewBag.Error = "Không xóa được bản ghi này ! " + ex.Message;
                return View("Delete",catalogy);
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
