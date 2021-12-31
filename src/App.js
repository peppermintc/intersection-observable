import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([
    { name: "기린", id: 0 },
    { name: "강아지", id: 1 },
    { name: "토끼", id: 2 },
    { name: "호랑이", id: 3 },
    { name: "사자", id: 4 },
  ]);

  const viewportRef = useRef(null);
  const targetRef = useRef(null);

  const loadMoreData = () => {
    setData((prevData) => {
      const newAnimals = [
        { name: "고양이", id: 5 },
        { name: "코끼리", id: 6 },
        { name: "원숭이", id: 7 },
        { name: "고라니", id: 8 },
        { name: "기린", id: 9 },
        { name: "표범", id: 10 },
      ];
      return [...prevData, ...newAnimals];
    });
  };

  useEffect(() => {
    const options = {
      root: viewportRef.current,
      threshold: 0,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadMoreData();
        observer.unobserve(entry.target);
        observer.observe(targetRef.current);
      });
    };

    const intersectionObserver = new IntersectionObserver(
      handleIntersection,
      options
    );

    if (targetRef.current) intersectionObserver.observe(targetRef.current);
    return () => intersectionObserver && intersectionObserver.disconnect();
  }, [viewportRef, targetRef]);

  return (
    <div className="wrapper">
      <section className="card-grid" id="target-root" ref={viewportRef}>
        {data.map((animal, index) => {
          const isLastElement = data.length - 1 === index;
          return (
            <div
              key={index}
              className={`card ${isLastElement && "last"}`}
              ref={isLastElement ? targetRef : null}
            >
              <p>아이디: {animal.id}</p>
              <p>이름: {animal.name}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default App;
