using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebformPractice.practice1
{
    public class Student
    {
        private string id;
        private string name;
        private int age;
        private string address;

        public Student(string id, string name, int age, string address)
        {
            this.id = id;
            this.name = name;
            this.age = age;
            this.address = address;
        }

        public string Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int Age { get => age; set => age = value; }
        public string Address { get => address; set => address = value; }
    }
}