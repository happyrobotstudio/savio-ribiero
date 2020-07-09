/** @jsx jsx */
import { Box, jsx, Container, Flex, Link, useColorMode } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import useEmiliaConfig from "../hooks/use-emilia-config"
import SocialMediaList from "./social-media-list"
import ColorModeToggle from "./colormode-toggle"
import { ChildImageSharpFixed } from "../types"
import { savio } from "./profileimage"
// @ts-ignore
import AboutMeMDX from "../texts/about-me"


type StaticImageQuery = {
  file: {
    childImageSharp: ChildImageSharpFixed
  }
}

const ProfileImage = () => {
  const { showThemeAuthor } = useEmiliaConfig()
  const savio = useStaticQuery<StaticImageQuery>(graphql`
    query {
      file(name: { eq: "savio" }) {
        childImageSharp {
          fixed(width: 313, height: 193, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }
  

  return (
    <div
      sx={{
        mt: 34,
      }}
    >
        {savio?.file?.childImageSharp?.fixed && <Img sx={{ top: `8px`, marginRight: `5px` }} fixed={savio.file.childImageSharp.fixed} />} 
    
    </div>
  )
}

export default ProfileImage
