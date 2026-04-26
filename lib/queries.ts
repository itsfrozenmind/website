export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  tagline,
  status,
  "image": image.asset->url,
  link,
  whatAndWhy,
  howItWorks,
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  tagline,
  status,
  "image": image.asset->url,
  link,
  whatAndWhy,
  howItWorks,
  arcadeEmbed,
}`

export const experienceQuery = `*[_type == "experience"] | order(order asc) {
  _id,
  role,
  company,
  period,
  description,
  "images": images[].asset->url,
}`

export const moviesQuery = `*[_type == "movie"] | order(order asc) {
  _id,
  title,
  "poster": poster.asset->url,
  whyRecommend,
  whereToWatch,
  moods,
}`

export const stripsQuery = `*[_type == "calvinHobbes"] | order(order asc) {
  _id,
  "image": image.asset->url,
  altText,
}`

export const moodQuestionsQuery = `*[_type == "moodQuestion"] | order(order asc) {
  _id,
  question,
  options,
}`
