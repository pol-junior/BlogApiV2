using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class Article
    {
        public Article()
        {
            Paragraphs = new List<Paragraph>();
            Date = DateTime.Now;
        }
        public int Id { set; get; }
        public string ImageUrl { set; get; }
        public string Title { set; get; }
        public IEnumerable<Paragraph> Paragraphs { set; get; }
        public DateTime Date { set; get; }
        public int CategoryId { set; get; }
        public int Views { set; get; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
