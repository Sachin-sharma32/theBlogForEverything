const query = `*[_type == "post"]{
  _id,likes,title,image,publishedAt,UpdatedAt,bestPost,topPostOfTheWeek,featuredPost,readTime,summery,content,
  'author': *[_type=='author']{
    name,image,bio,location,education,work,email
  },
  'tag':*[_type=='tag']{
    title, image, recommended
  },
  'category':*[_type=='category']{
    _id,title,slug,description,image,recommended
  },
  comments[]->
}`;

export default query;
