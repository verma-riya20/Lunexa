import { useParams } from 'react-router-dom';
import Quiz from './Quiz';

const content = {
  'menstrual-health-basics': {
    title: 'Menstrual Health Basics',
    description: 'Everything you need to know about periods, cycle tracking, hygiene, and more.',
    articles: [
      { title: 'What Is a Menstrual Cycle?', link: 'https://my.clevelandclinic.org/health/articles/10132-menstrual-cycle' },
      { title: 'Menstrual Hygiene', link: 'https://www.cdc.gov/hygiene/about/menstrual-hygiene.html#:~:text=Do%20not%20flush%20menstrual%20products,every%204%20to%208%20hours.' },
    ],
    videos: [
      { title: 'Understanding Periods', embedUrl: 'https://www.youtube.com/watch?v=7HlHGLr1hTA' },
    ]
  },
  'myth-busting': {
    title: 'Myth Busting',
    description: 'We challenge and debunk common menstrual myths and misinformation.',
    articles: [
      { title: 'Top 10 Period Myths Debunked', link: '#' },
    ],
    videos: [],
    downloads: [],
  },
  'sustainable-alternatives': {
    title: 'Sustainable Alternatives',
    description: 'Explore eco-friendly menstrual products that reduce waste and promote sustainable living.',
    articles: [],
    videos: [],
    downloads: [],
  },
  'period-care-tips': {
    title: "Period Care",
    description: "Learn how to take care of your body before, during, and after your period.",
    articles: [
      {
        title: "Best Hygiene Practices During Menstruation",
        link: "https://www.cdc.gov/hygiene/about/menstrual-hygiene.html",
      },
      {
        title: "How to Track Your Cycle Effectively",
        link: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/calculating-your-monthly-fertility-window#:~:text=Calendar%20method,t%20be%20accurate%20for%20you.",
      },
    ],
    videos: [
      {
        title: "Menstrual Hygiene Tips",
        embedUrl: "https://www.youtube.com/embed/example1",
      },
      {
        title: "Caring for Your Body During Your Period",
        embedUrl: "https://www.youtube.com/embed/example2",
      },
    ],
    downloads: [
      {
        title: "Period Care Checklist (PDF)",
        fileUrl: "/downloads/period-care-checklist.pdf",
      },
    ],
  },
  'menstrual-hygiene-quiz': {
  title: "Menstrual Hygiene Quiz",
  description: "Test your knowledge and learn important facts about menstrual health.",
  articles: [],
  videos: [],
  downloads: [],
},
'pcos-and-health-issues': {
  title: "PCOS and Health Issues",
  description: "Learn about PCOS, its symptoms, and how it affects menstrual health and overall well-being.",
  articles: [
    {
      title: "Understanding PCOS: Symptoms and Treatment",
      link: "https://www.cdc.gov/pcos/index.html",
    },
    {
      title: "How PCOS Affects Menstrual Health",
      link: "https://www.healthline.com/health/pcos/menstrual-cycle",
    },
  ],
  videos: [
    {
      title: "PCOS Explained: A Guide to Polycystic Ovary Syndrome",
      embedUrl: "https://www.youtube.com/embed/abc123", // Replace with actual video link
    },
  ],
  downloads: [
    {
      title: "PCOS Information Sheet (PDF)",
      fileUrl: "/downloads/pcos-info.pdf",
    },
  ],
},

'health-issues': {
  title: "Health Issues Related to Menstruation",
  description: "Explore common health issues that may impact menstrual cycles, including endometriosis, fibroids, and more.",
  articles: [
    {
      title: "Understanding Endometriosis",
      link: "https://www.cdc.gov/endometriosis/index.html",
    },
    {
      title: "Dealing with Menstrual Fibroids",
      link: "https://www.mayoclinic.org/diseases-conditions/uterine-fibroids/symptoms-causes/syc-20350363",
    },
  ],
  videos: [
    {
      title: "What is Endometriosis?",
      embedUrl: "https://www.youtube.com/embed/xyz456", // Replace with actual video link
    },
  ],
  downloads: [
    {
      title: "Health Issues Guide (PDF)",
      fileUrl: "/downloads/health-issues-guide.pdf",
    },
  ],
},

};

const CategoryPage = () => {
  const { category } = useParams();
  const categoryData = content[category];

  if (!categoryData) {
    return <div className="p-10 text-center text-red-500">Category not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-2">{categoryData.title}</h1>
      <p className="text-gray-700 mb-6">{categoryData.description}</p>

      {/* Myth Busting Section */}
      {category === 'myth-busting' ? (
        <div className="space-y-8 mt-6">
          <h2 className="text-xl font-bold text-pink-600 mb-4">🧠 Common Menstrual Myths Debunked</h2>
          {[
            {
              id: 'impure-blood',
              myth: 'Period blood is impure or dirty.',
              fact: 'Menstrual blood is simply a mix of blood, uterine tissue, and secretions, and it’s a natural part of the reproductive cycle.',
            },
            {
              id: 'pregnancy-on-period',
              myth: 'You can’t get pregnant during your period.',
              fact: 'While it’s less likely, it’s still possible depending on your cycle and ovulation timing.',
            },
            {
              id: 'exercise-during-period',
              myth: 'You shouldn’t exercise while on your period.',
              fact: 'Exercise can actually be beneficial for reducing menstrual cramps and improving mood.',
            },
            {
              id: 'food-during-period',
              myth: 'Women should avoid certain foods during menstruation.',
              fact: 'There’s no scientific basis for avoiding specific foods during menstruation.',
            },
            {
              id: 'syncing-periods',
              myth: 'Periods sync up among women who live together.',
              fact: 'While it may seem so, there’s no scientific evidence to support this.',
            },
            {
              id: 'tampons-virginity',
              myth: 'Tampons cause you to lose your virginity.',
              fact: 'Tampons don’t affect virginity — it’s a social concept, not a physical one.',
            },
            {
              id: 'bathing-period',
              myth: 'Women shouldn’t bathe during periods.',
              fact: 'Bathing is totally safe and can even be soothing during menstruation.',
            },
            {
              id: 'blood-color',
              myth: 'Period blood is always bright red.',
              fact: 'Menstrual blood can vary in color and consistency — and that’s normal.',
            },
            {
              id: 'swimming-period',
              myth: 'You can’t swim while on your period.',
              fact: 'You absolutely can — use a tampon or menstrual cup.',
            },
            {
              id: 'pms-is-fake',
              myth: 'PMS is fake or in your head.',
              fact: 'PMS is real, with both physical and emotional symptoms caused by hormone changes.',
            },
            {
              id: 'irregular-periods',
              myth: 'It’s normal to have irregular periods.',
              fact: 'It can be normal early on, but consistent irregularity should be checked by a doctor.',
            },
          ].map((item, index) => (
            <div key={index} id={item.id} className="bg-white border rounded-xl p-4 shadow-sm scroll-mt-24">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-red-600">Myth:</p>
                  <p className="text-gray-800 mb-2">{item.myth}</p>
                  <p className="font-semibold text-green-600">Fact:</p>
                  <p className="text-gray-700">{item.fact}</p>
                </div>
                <a
                  href={`https://www.metropolisindia.com/blog/health-wellness/busting-period-myths-science-about-periods#${item.id}`}
                  className="text-gray-400 hover:text-pink-500"
                  title="Copy link to this myth"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.656-5.656l1.414-1.414m5.656 5.656L15 15m-6 0h.01" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : category === 'sustainable-alternatives' ? (
        <div className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-black">🌍 Sustainable Menstrual Alternatives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Menstrual Cups',
                description: 'Reusable silicone cups inserted into the vagina to collect menstrual blood. Can last up to 10 years with proper care.',
              },
              {
                name: 'Period wear',
                description: 'Washable, absorbent underwear designed to be worn without pads or tampons. Great for comfort and reusability.',
              },
              {
                name: 'Reusable Cloth Pads',
                description: 'Soft, washable pads made from absorbent fabric. Easy to use, eco-friendly, and available in fun prints!',
              },
              {
                name: 'Menstrual Discs',
                description: 'Flexible discs that sit higher in the vaginal canal than cups. Some are reusable, others are disposable but with lower waste.',
              },
            ].map((item, index) => (
              <div key={index} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold text-emerald-700 mb-2">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ): category === 'pcos-and-health-issues' ? (
        <div className="mt-10">
          <h1 className="text-3xl font-bold text-pink-600">{content['pcos-and-health-issues'].title}</h1>
          <p>{content['pcos-and-health-issues'].description}</p>
          {/* Articles */}
          <div>
            <h2 className="text-xl font-bold mt-6">Articles</h2>
            {content['pcos-and-health-issues'].articles.map((article, idx) => (
              <ul key={idx} className="list-disc list-inside text-blue-600">
                <li><a href={article.link} className="hover:underline">{article.title}</a></li>
              </ul>
            ))}
          </div>
          {/* Videos */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Videos</h2>
            {content['pcos-and-health-issues'].videos.map((video, idx) => (
              <div key={idx}>
                <h3>{video.title}</h3>
                <iframe src={video.embedUrl} className="w-full h-56" allowFullScreen title={video.title}></iframe>
              </div>
            ))}
          </div>
          {/* Downloads */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Downloads</h2>
            <ul className="space-y-2">
              {content['pcos-and-health-issues'].downloads.map((download, idx) => (
                <li key={idx}>
                  <a href={download.fileUrl} download className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition">
                    {download.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        categoryData.articles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Articles</h2>
            <ul className="list-disc list-inside text-blue-600 space-y-1">
              {categoryData.articles.map((article, idx) => (
                <li key={idx}>
                  <a href={article.link} className="hover:underline">
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {/* Videos */}
      {categoryData.videos?.length > 0 && (
        <div className="mb-6 mt-6">
          <h2 className="text-xl font-semibold mb-2">🎥 Videos</h2>
          <div className="space-y-4">
            {categoryData.videos.map((v, i) => (
              <div key={i}>
                <h3 className="text-md font-medium mb-1">{v.title}</h3>
                <div className="aspect-video">
                  <iframe src={v.embedUrl} title={v.title} className="w-full h-full rounded-lg" allowFullScreen />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Downloads */}
      {categoryData.downloads?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">📥 Downloads</h2>
          <ul className="space-y-2">
            {categoryData.downloads.map((d, i) => (
              <li key={i}>
                <a href={d.fileUrl} download className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition">
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

{/* 🎯 Show Quiz if this is the quiz category */}
{category === 'menstrual-hygiene-quiz' && (
  <div className="mt-10">
    <Quiz />
  </div>
)}

      
    </div>
  );
};

export default CategoryPage;
