const content = require("./src/components/content.data")

const description = `
An overengineer building tools for better code reading comprehension
`.trim()

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-theme-waves",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 420,
              linkImagesToOriginal: false,
            },
          },
          "gatsby-remark-smartypants",
          "@weknow/gatsby-remark-twitter",
          "gatsby-remark-import-code",
        ],
        remarkPlugins: [require(`remark-slug`)],
        // rehypePlugins: [require(`rehype-waves`)],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: "/rss.xml",
            query: `{
              site {
                siteMetadata {
                  siteUrl
                }
              }
            }`,
            serialize: ({ query }) =>
              content.map(post => ({
                title: post.title,
                description: post.description ? post.description : "",
                categories: [post.type],
                date: post.date,
                url: makeAbsoluteUrl(post.url, query.site.siteMetadata.siteUrl),
                guid: post.url,
              })),
          },
        ],
      },
    },
  ],
  siteMetadata: {
    title: "Rodrigo Pombo",
    description,
    url: "https://pomb.us",
    siteUrl: "https://pomb.us",
    image: "/profile.jpg", 
    twitterUsername: "@pomber",
  },
}

function makeAbsoluteUrl(maybeRelativeUrl, siteUrl) {
  return maybeRelativeUrl.startsWith("/")
    ? siteUrl + maybeRelativeUrl
    : maybeRelativeUrl
}
