/** @jsx jsx */
import { Box, jsx, Container, Flex, Link, useColorMode } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import useEmiliaConfig from "../hooks/use-emilia-config"
import SocialMediaList from "./social-media-list"
import ColorModeToggle from "./colormode-toggle"
import { ChildImageSharpFixed } from "../types"
import ProfileImage from "./profileimage"

// @ts-ignore
import AboutMeMDX from "../texts/about-me"


type AvatarStaticQuery = {
  file: {
    childImageSharp: ChildImageSharpFixed
  }
}

const Footer = () => {
  const { showThemeAuthor } = useEmiliaConfig()
  const avatar = useStaticQuery<AvatarStaticQuery>(graphql`
    query {
      file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(width: 30, height: 30, quality: 100) {
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
    <Box
      as="footer"
      variant="layout.footer"
      sx={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${isDark ? `0.35` : `0.15`}) 100%)`,
      }}
    >
      <Container>
        <div sx={{ display: `grid`, gridGap: 4, gridTemplateColumns: [`1fr`, `1fr`, `1fr`, `2fr 1fr`] }}>
          <div
            sx={{
              p: { mb: 0 },
              h2: {
                mt: 0,
                mb: 1,
              },
            }}
          >
            <AboutMeMDX />
          </div>
          
          <Flex
            sx={{
              textAlign: [`center`, `center`, `center`, `right`],
              flexDirection: `column`,
              justifyContent: `space-between`,
            }}
          >

            {/* <ColorModeToggle isDark={isDark} toggle={toggleColorMode} /> */}

            <ProfileImage />

            {/* <div sx={{ mt: [4, 4, 4, 0] }}>
              <div sx={{ a: { ml: [1, 1, 1, 2], mr: [1, 1, 1, 0] } }}>
                <SocialMediaList />
              </div>   
            </div> */}

          </Flex>
        </div>
      </Container>
      {showThemeAuthor && (
        <Container
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `center`,
            alignItems: `center`,
            color: `text`,
            fontWeight: `semibold`,
            a: { color: `text` },
            mt: 4,
          }}
        >



          <div sx={{  }}>
            
            <h2 
                sx={{
                  color: `var(--theme-ui-colors-heading,#000)`,
                }}
                >
                  Want to start your own project?
            </h2>

            <button
              type="button"
              aria-label="Contact Savio"
              title="Contact Savio"
              sx={{
                mt: 65,
                mb: 185,
                ml: `auto`,
                mr: `auto`,
                opacity: 1,
                clear: `both`,
                position: `relative`,
                borderRadius: `25px`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                transition: `opacity 0.3s ease`,
                border: `none`,
                background: `black`,
                outline: `none`,
                cursor: `pointer`,
                padding: `15px 45px`,
                appearance: `none`,
                "&:hover, &:focus": { opacity: 0.75 },
              }}
            >
              

              <div
                sx={{
                  position: `relative`,
                  color: `#FFF`,
                  backgroundColor: isDark ? `toggleIcon` : `transparent`,
                  transform: isDark ? `scale(0.55)` : `scale(1)`,
                  transition: `all 0.45s ease`,
                  overflow: isDark ? `visible` : `hidden`,
                  fontSize: `0.95rem`,
                }}
              >
                Contact Savio
              </div>
            </button>
            
            <div 
              sx={{ mx: 1, 
                textAlign: `center`,
                marginTop: `25px`,
              }}
              > 
                {avatar?.file?.childImageSharp?.fixed && <Img sx={{ top: `8px`, marginRight: `5px` }} fixed={avatar.file.childImageSharp.fixed} />} 
                {` `} 
                Savio Ribiero
            </div>

            <div sx={{ color: `textMuted`, textAlign: `center`, fontSize: `0.75em`, mt: 35, mb: 15 }}>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</div>


          </div>
         
        </Container>
      )}
    </Box>
  )
}

export default Footer
