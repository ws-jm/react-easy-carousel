import styled from "https://cdn.skypack.dev/styled-components@5.2.1";
import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const H1 = styled.h1`
  text-align: center;
  margin: 0;
  padding-bottom: 10rem;
`;

const Relative = styled.div`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
`;

const HorizontalCenter = styled(Flex)`
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  max-width: 25rem;
`;

const Container = styled.div`
  height: stretch;
  width: 100%;

  background: #ecf0f1;
`;

const Item = styled.div`
  color: white;
  font-size: 2rem;
  text-transform: capitalize;

  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};

  display: flex;

  align-items: center;
  justify-content: center;
`;

function getPrevElement(list) {
  const sibling = list[0].previousElementSibling;

  if (sibling instanceof HTMLElement) {
    return sibling;
  }

  return sibling;
}

function getNextElement(list) {
  const sibling = list[list.length - 1].nextElementSibling;

  if (sibling instanceof HTMLElement) {
    return sibling;
  }

  return null;
}

function usePosition(ref) {
  const [prevElement, setPrevElement] = React.useState(null);
  const [nextElement, setNextElement] = React.useState(null);

  React.useEffect(() => {
    const element = ref.current;

    const update = () => {
      const rect = element.getBoundingClientRect();

      const visibleElements = Array.from(element.children).filter(child => {
        const childRect = child.getBoundingClientRect();


        return childRect.left >= rect.left && childRect.right <= rect.right;
      });

      if (visibleElements.length > 0) {
        setPrevElement(getPrevElement(visibleElements));
        setNextElement(getNextElement(visibleElements));
      }
    };

    update();

    element.addEventListener('scroll', update, { passive: true });

    return () => {
      element.removeEventListener('scroll', update, { passive: true });
    };
  }, [ref]);

  const scrollToElement = React.useCallback(
  element => {
    const currentNode = ref.current;

    if (!currentNode || !element) return;

    let newScrollPosition;

    newScrollPosition =
    element.offsetLeft +
    element.getBoundingClientRect().width / 2 -
    currentNode.getBoundingClientRect().width / 2;

    currentNode.scroll({
      left: newScrollPosition,
      behavior: 'smooth' });

  },
  [ref]);


  const scrollRight = React.useCallback(() => scrollToElement(nextElement), [
  scrollToElement,
  nextElement]);


  const scrollLeft = React.useCallback(() => scrollToElement(prevElement), [
  scrollToElement,
  prevElement]);


  return {
    hasItemsOnLeft: prevElement !== null,
    hasItemsOnRight: nextElement !== null,
    scrollRight,
    scrollLeft };

}

const CarouserContainer = styled(Relative)`
  overflow: hidden;
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;

  margin-left: 1rem;
`;

const CarouselButton = styled.button`
  position: absolute;

  cursor: pointer;

  top: 50%;
  z-index: 1;

  transition: transform 0.1s ease-in-out;

  background: white;
  border-radius: 15px;
  border: none;
  padding: 0.5rem;
`;
const LeftCarouselButton = styled(CarouselButton)`
  left: 0;
  transform: translate(-100%, -50%);

  ${CarouserContainer}:hover & {
    transform: translate(0%, -50%);
  }

  visibility: ${({ hasItemsOnLeft }) => hasItemsOnLeft ? `all` : `hidden`};
`;

const RightCarouselButton = styled(CarouselButton)`
  right: 0;
  transform: translate(100%, -50%);

  ${CarouserContainer}:hover & {
    transform: translate(0%, -50%);
  }

  visibility: ${({ hasItemsOnRight }) => hasItemsOnRight ? `all` : `hidden`};
`;

const CarouserContainerInner = styled(Flex)`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  // offset for children spacing
  margin-left: -1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  ${CarouselItem} & {
    scroll-snap-align: center;
  }
`;

const ArrowLeft = ({ size = 30, color = '#000000' }) => /*#__PURE__*/
React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round" }, /*#__PURE__*/

React.createElement("path", { d: "M19 12H6M12 5l-7 7 7 7" }));




const ArrowRight = ({ size = 30, color = '#000000' }) => /*#__PURE__*/
React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round" }, /*#__PURE__*/

React.createElement("path", { d: "M5 12h13M12 5l7 7-7 7" }));




function Carousel({ children }) {
  const ref = React.useRef();

  const {
    hasItemsOnLeft,
    hasItemsOnRight,
    scrollRight,
    scrollLeft } =
  usePosition(ref);

  return /*#__PURE__*/(
    React.createElement(CarouserContainer, { role: "region", "aria-label": "Colors carousel" }, /*#__PURE__*/
    React.createElement(CarouserContainerInner, { ref: ref },
    React.Children.map(children, (child, index) => /*#__PURE__*/
    React.createElement(CarouselItem, { key: index }, child))), /*#__PURE__*/


    React.createElement(LeftCarouselButton, { hasItemsOnLeft: hasItemsOnLeft, onClick: scrollLeft, "aria-label": "Previous slide" }, /*#__PURE__*/
    React.createElement(ArrowLeft, null)), /*#__PURE__*/

    React.createElement(RightCarouselButton, {
      hasItemsOnRight: hasItemsOnRight,
      onClick: scrollRight,
      "aria-label": "Next slide" }, /*#__PURE__*/

    React.createElement(ArrowRight, null))));



}

const colors = [
'#f1c40f',
'#f39c12',
'#e74c3c',
'#16a085',
'#2980b9',
'#8e44ad',
'#2c3e50',
'#95a5a6'];


const numbersArray = Array.from(Array(10).keys()).map((number) => /*#__PURE__*/
React.createElement(Item, { size: 5, style: { color: 'black' }, key: number },
number));



const colorsArray = colors.map((color) => /*#__PURE__*/
React.createElement(Item, {
  size: 20,
  style: { background: color, borderRadius: '20px', opacity: 0.9 },
  key: color },

color));



function App() {
  return /*#__PURE__*/(
    React.createElement(Container, null, /*#__PURE__*/
    React.createElement(H1, null, "Easy Carousel"), /*#__PURE__*/
    React.createElement(HorizontalCenter, null, /*#__PURE__*/
    React.createElement(Carousel, null, colorsArray)), /*#__PURE__*/


    React.createElement(HorizontalCenter, null, /*#__PURE__*/
    React.createElement(Carousel, null, numbersArray))));



}

ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('root'));