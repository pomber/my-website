import React from "react"
import { Scroller, StepContainer } from "./scroller"
import { useSpring } from "use-spring"
import { getFrame } from "./vertical-queue"
import { BrowserIframe } from "./browser"
import EditorFrame from "./editor-walk"

export function CodeHike({ steps, views }) {
  const [currentIndex, setCurrentIndex] = React.useState(null)
  const [springIndex] = useSpring(currentIndex, {
    decimals: 3,
    stiffness: 25,
    damping: 9,
  })
  const progress = Math.min(steps.length - 1, Math.max(0, springIndex))
  const backwards = currentIndex < progress
  return (
    <div
      style={{
        width: 1010,
        marginLeft: -590,
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 420,
          marginLeft: 0,
          position: "static",
          top: "auto",
          zIndex: "auto",
          height: "auto",
          paddingRight: 85,
        }}
      >
        <Sticker views={views} progress={progress} backwards={backwards} />
      </div>
      <Scroller onStepChange={index => setCurrentIndex(index)}>
        <div
          style={{
            paddingTop: 0,
            width: 420,
            paddingLeft: 85,
          }}
        >
          {steps.map((child, i) => (
            <StepContainer
              style={{
                position: "relative",
                marginBottom: 50,
              }}
              id={i}
              key={i}
            >
              <StepLink index={i} progress={progress} />
              {child}
              <div
                id={"step-" + i}
                style={{
                  position: "absolute",
                  height: "100vh",
                  top: "calc(50% - max(50vh, 51%))",
                  visibility: "hidden",
                }}
              />
            </StepContainer>
          ))}
        </div>
      </Scroller>
    </div>
  )
}

function Sticker({ views, progress, backwards }) {
  const prevKids = views[Math.floor(progress)]
  const nextKids = views[Math.floor(progress) + 1] || prevKids
  const padding = 30
  const { frame, height } = getFrame(prevKids, nextKids, progress % 1, padding)
  return (
    <div
      style={{
        height,
        width: "100%",
        position: "sticky",
        top: `calc(50vh - ${height / 2}px)`,
      }}
    >
      {frame.map(({ child, translateY, opacity }, i) => (
        <div
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            transform: `translateY(${translateY}px)`,
            opacity: opacity,
          }}
        >
          {React.cloneElement(child, { progress, backwards })}
        </div>
      ))}
    </div>
  )
}
export function Editor({ children, progress, steps, ...props }) {
  return <EditorFrame steps={steps} progress={progress} {...props} />
}
export function Browser({ height, url }) {
  return <BrowserIframe url={url} height={height} />
}

function StepLink1({ index, progress }) {
  const p = 1 - Math.max(1 - Math.abs(index - progress), 0)
  const width = 30
  const left = -85
  return (
    <div
      style={{
        transform: `translateX(-${p * 100}%)`,
        height: "100%",
        width: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        background: "#eee",
      }}
    >
      {/* <a
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          display: "block",
          background: "#202226",
          textAlign: "center",
          color: "rgba(175,173,169,1)",
          paddingTop: 10,
          boxSizing: "border-box",
          // border: "2px solid rgba(175,173,169,1)",
          // borderRight: 0,
          // borderTopLeftRadius: 16,
          // borderBottomLeftRadius: 16,
        }}
        href={"#step-" + index}
      ></a> */}
    </div>
  )
}
function StepLink({ index, progress }) {
  return (
    <a
      style={{
        position: "absolute",
        height: "100%",
        width: 30,
        left: -45,
        top: 0,
        opacity: Math.max(1 - Math.abs(index - progress), 0.2),
        display: "block",
        // background: "rgba(175,173,169,0.5)",
        textAlign: "center",
        color: "rgba(175,173,169,1)",
        paddingTop: 10,
        boxSizing: "border-box",
        border: "solid rgba(175,173,169,1)",
        borderWidth: "2px 2px 3px 2px",
        // borderRight: 0,
        // borderTopLeftRadius: 16,
        // borderBottomLeftRadius: 16,
      }}
      href={"#step-" + index}
    >
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
        aria-hidden="true"
        fill="currentColor"
        style={{ transform: "rotate(90deg)" }}
      >
        <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
      </svg>
      <div
        style={{
          width: "0",
          height: "0",
          position: "absolute",
          bottom: 1,
          left: -2,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid rgba(175,173,169,1)",
        }}
      ></div>
      <div
        style={{
          width: "0",
          height: "0",
          position: "absolute",
          bottom: -3,
          left: -2,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid #FAF9F5",
        }}
      ></div>
    </a>
  )
}