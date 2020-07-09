/** @jsx jsx */
import React from "react"
import { Flex, jsx, useColorMode, Container, Heading, Styled } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import HeaderBackground from "./header-background"
import LeftArrow from "../assets/left-arrow"
import useEmiliaConfig from "../hooks/use-emilia-config"
import { ChildImageSharpFixed } from "../types"
import ColorModeToggle from "./colormode-toggle"

type HeaderProjectProps = {
  title: string
  areas: string[]
  description?: string
  date: string
}

type AvatarStaticQuery = {
  file: {
    childImageSharp: ChildImageSharpFixed
  }
}

const HeaderProject = ({ title, areas, description = ``, date }: HeaderProjectProps) => {
  const { name } = useEmiliaConfig()
  const avatar = useStaticQuery<AvatarStaticQuery>(graphql`
    query {
      file(name: { eq: "avatar" }) {
        childImageSharp {
          fixed(width: 40, height: 40, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  const toggleColorButtonProps = useSpring({
    // config: config.fast,
    // from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    // to: { opacity: 0.8, transform: `translate3d(0, 0, 0)` },
  })
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const backButtonProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Flex as="header" variant="layout.header">
      <HeaderBackground />
      <Container sx={{ textAlign: `center`, my: 4, zIndex: 10 }}>
        <animated.div style={backButtonProps}>
          <Link
            to="/"
            aria-label={`${name} - Back to homepage`}
            sx={{
              display: `flex`,
              alignItems: `center`,
              color: `text`,
              textDecoration: `none`,
              svg: {
                transition: `transform 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
              },
              "&:hover, &:focus": { svg: { transform: `translateX(-6px)` } },
            }}
          >
            <LeftArrow />
            <div
              sx={{
                overflow: `hidden`,
                borderRadius: `full`,
                width: `40px`,
                height: `40px`,
                display: `inline-block`,
                boxShadow: `md`,
                mx: 2,
              }}
            >
              {avatar?.file?.childImageSharp?.fixed && <Img fixed={avatar.file.childImageSharp.fixed} />}
            </div>
            <span sx={{ fontWeight: `medium` }}>{/*name*/}</span>
          </Link>
        </animated.div>
        <div sx={{ mt: 4, mb: 260 }}>
          <animated.div style={titleProps}>
            <Heading as="h1" variant="styles.h1">
              {title}
            </Heading>
          </animated.div>
          <animated.div style={infoProps}>

            <h2
              sx={{
                color: `textMuted`,
                fontWeight: `medium`,
                letterSpacing: `widest`,
                textTransform: `uppercase`,
                fontSize: 1,
                my: 0,
                mt: 25,
                mb: 25,
              }}
            >
              {date}
            </h2>

            <div>
              {areas.map((area, index) => (
                <React.Fragment key={area}>
                  {index > 0 && `, `}
                  {area}
                </React.Fragment>
              ))}
            </div>
            {description && (
              <div sx={{ maxWidth: `900px`, mx: `auto`, mt: 5, p: { textAlign: `left` } }}>
                <MDXRenderer>{description}</MDXRenderer>
              </div>
            )}
          </animated.div>
        </div>

        {/* <animated.div style={toggleColorButtonProps} sx={{ position: `absolute`, top: 30, right: 30, }}>
          <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
        </animated.div> */}


      </Container>
    </Flex>
  )
}

export default HeaderProject
