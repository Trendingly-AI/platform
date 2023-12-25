export default class NewsService {
    getInsightsSmall() {
        return fetch('demo/data/insights-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
