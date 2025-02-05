import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Choosing the Best Watches",
    content: [
      { heading: 'About the creation.', para: "First of all, the Gianni reinvents and replaces a best seller, the Sienna. With its construction made of a central compartment and two gussets with straight edges, it takes up the emblematic design of the 'box' bags.Secondly, it is adorned with a brand new clasp, designed and industrialized by hand with our production workshop in Naples.Finally, the Gianni is the result of almost 10 years of experience. It is what you would expect from a timeless model: style without being overdressed. A structured base, without being rigid. A practical size, without being bulky." },
      { heading: 'From design to the realization.', para: "For the first time, we are sharing with you all the drawings that allowed the creation of a new model. Structure, jewelry and custom clasp are all elements that have been carefully designed to allow our Italian workshop to shape the Gianni design." },
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0011/6680/3007/files/Focus_on_your_new_favorite__Le_Gianni_-_1.png?v=1679500140",
  },
  {
    id: 2,
    title: "Caring for your Air Plant",
    content: [
      { heading: 'Watering', para: "Thoroughly wet your tillandsia 2-3 times per week; more often in a hot, dry environment; less often in a cool, humid one. In conditions of extreme drying and consequent moisture loss, air plants cannot get replacement water from their roots like a terrestrial plant, or draw on internal reserves like a succulent.After watering, plants should be given enough light and air circulation to dry in no longer than 4 hours. Wind can be a detriment, as it can make the plant dry too quickly. Remember that window fans can cause the plant to dry quickly as well. If the plant dries within a very short period of time it does not have the chance to re-hydrate at all." },
      { heading: 'Air Circulation', para: "Following each watering, Tillandsias should be given enough light and air circulation to dry in 4 hours or less. Do not keep plants constantly wet or moist.Do not allow to dry too quickly though. 1-3 hours is optimum." },
    ],
    imageUrl: "https://bespoke-home-garden-theme.myshopify.com/cdn/shop/articles/caring-for-your-air-plant.webp?crop=region&crop_height=750&crop_left=401&crop_top=0&crop_width=999&v=1733514660&width=710",
  },
  {
    id: 3,
    title: "2018 Sniper: Outdoor Life review",
    content: [
      { heading: "", para: "Throughout the 1990s and first decade of the 21st century, mountain biking moved from a little-known sport to a mainstream activity. Mountain bikes and mountain bike gear, that was once only available at specialty shops or via mail order, became available at standard bike stores. By the mid-first decade of the 21st century, even some department stores began selling inexpensive mountain bikes with full-suspension and disc brakes. In the first decade of the 21st century, trends in mountain bikes included the 'all-mountain bike', the 29er and the singlespeed. 'All-mountain bikes' were designed to descend and handle well in rough conditions, but still pedal efficiently for climbing, and were intended to bridge the gap between cross-country bikes and those built specifically for downhill riding.They are characterized by 4–6 inches (100–150 millimetres) of travel. 29er bikes are those using 700c sized rims (as do most road bikes), but wider and suited for tires of two inches (50mm) width or more; the increased diameter wheel is able to roll over obstacles better and offers a greater tire contact patch, but also results in a longer wheelbase, making the bike less agile, and in less travel space for the suspension. The single-speed is considered a return to simplicity with no drivetrain components or shifters but thus requires a stronger rider.Following the growing trend in 29-inch bikes(29ers as stated above), there have been other trends in the mountain biking community involving tire size.One of the more prevalent is the new, somewhat esoteric and exotic 650B(27.5 inch) wheelsize, based on the obscure wheel size for touring road bikes.Another interesting trend in mountain bikes is outfitting dirt jump or urban bikes with rigid forks.These bikes normally use 4–5 travel suspension forks. The resulting product is used for the same purposes as the original bike. A commonly cited reason for making the change to a rigid fork is the enhancement of the rider's ability to transmit force to the ground, which is important for performing tricks. In the mid-first decade of the 21st century, an increasing number of mountain bike-oriented resorts opened. Often, they are similar to or in the same complex as a ski resort or they retrofit the concrete steps and platforms of an abandoned factory as an obstacle course, as with Ray's MTB Indoor Park. Mountain bike parks which are operated as summer season activities at ski hills usually include chairlifts which are adapted to bikes, a number of trails of varying difficulty, and bicycle rental facilities." },
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0027/0994/6429/files/andhika-soreng-390599-unsplash_2048x2048.jpg?v=1526480493",
  }
];

const BlogPost = () => {
  const { id } = useParams();

  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Blog post not found!</div>;
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
            {post.content.map((item, index) => {
              return (
                <div>
                  <h1 className="text-[20px] font-semibold text-gray-900">{item.heading}</h1>
                  <p className="mt-4 text-lg text-gray-700">{item.para}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;