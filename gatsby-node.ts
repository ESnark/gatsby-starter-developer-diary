import * as path from "node:path";
import { createFilePath } from 'gatsby-source-filesystem';
import _ from 'lodash';
import { GatsbyNode, PageProps, graphql } from 'gatsby';

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql<Queries.PagesQuery>(`
  query Pages {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`);

  const posts = _.map(result.data?.allMarkdownRemark.edges || [], edge => ({
    node: {
      frontmatter: {
        tags: _.compact(edge.node.frontmatter?.tags || [])
      },
      fields: {
        slug: edge.node.fields?.slug || ""
      }
    }
  }))

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });

  // Tag pages:
  let tags: string[] = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: path.resolve("src/templates/tag.js"),
      context: {
        tag,
      },
    });
  });
  const postsPerPage = 3;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/post-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  });
}

export const PagesQuery = graphql`
  query Pages {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
