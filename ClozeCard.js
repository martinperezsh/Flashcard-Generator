module.exports = ClozeCard;

function ClozeCard(text, cloze) {
	this.fullText = text;
	this.cloze = cloze;
	this.partial = function () {
        var partialText = text.slice(this.cloze, this.text.length);
        console.log("..." + partialText);
    }

}