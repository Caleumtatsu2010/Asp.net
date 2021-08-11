using System.Web;
using System.Web.Mvc;

namespace NguyenHoangLong_2388_De4
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
