let currentPage = 1;

const getQuotesAPI = () => {
  return 'https://node-hnapi.herokuapp.com/news?page=' + currentPage;
};

/**
   Process the data returned from the api
**/
const processData = res => {
  res.json()
    .then(news => {
      currentPage++;
      news.forEach(renderNews);
    });
};

/**
   Render each news on to the view
**/
const renderNews = (news) => {
  const li = document.createElement('li');
  li.innerHTML = `${news.id} - ${news.title}`;
  scrollElem.appendChild(li);
};

/**
    check if the user is scrolling down by
    previous scroll position and current scroll position
**/
const isUserScrollingDown = (positions) => {
  return positions[0].sT < positions[1].sT;
};

/** Check if the scroll position at required
    percentage relative to the container
**/
const isScrollExpectedPercent = (position, percent) => {
  return ((position.sT + position.cH) / position.sH) > (percent / 100);
};
