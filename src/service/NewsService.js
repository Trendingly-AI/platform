export default class NewsService {
    getNewsSmall() {
        return fetch('demo/data/news-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
