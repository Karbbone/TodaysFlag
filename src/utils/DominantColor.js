function getDominantColor(imageData) {
    const colorCount = {};
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) {
            continue;
        }

        const color = `${r},${g},${b}`;
        colorCount[color] = (colorCount[color] || 0) + 1;
    }

    let dominantColor = "";
    let maxCount = 0;

    for (const [color, count] of Object.entries(colorCount)) {
        if (count > maxCount) {
            dominantColor = color;
            maxCount = count;
        }
    }

    return dominantColor.split(",").map(Number);
}
export default getDominantColor;    