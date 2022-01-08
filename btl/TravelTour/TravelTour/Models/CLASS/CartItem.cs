using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TravelTour.Models.CLASS
{
    [Serializable]
    public class CartItem
    {
        public Tour tour { set; get; }
    }
}