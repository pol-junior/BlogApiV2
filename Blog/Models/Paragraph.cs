using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class Paragraph
    {
        public int ParagraphId { set; get; }
        public string Header { set; get; }
        public string Text { set; get; }
        public int ArticleId { set; get; }
    }
}
