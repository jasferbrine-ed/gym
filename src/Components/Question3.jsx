function Question3() {
    const [weather, setWeather] = useState("rainy")
    const [temperature, setTemperature] = useState (33)
    const [isWeekend, setWeekend] = useState(false) 
    return <div>
        <h1>Question3</h1>
        {}
        {
            weather === "sunny"?
            temperature > 30 ?
            "go to beach" : "nice weather" :
            weather === "rainy" && isWeekend === true ?
            "stay home and rest " : "normal weather"
}
</div>
export default Question3; 
