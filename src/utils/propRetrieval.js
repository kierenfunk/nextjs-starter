import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const propRetrieval = async (targetFile=null) => {
	// const directory = path.join(process.cwd(), 'src/markdown/tours')
	// const filenames = fs.readdirSync(directory)

	/* const tours = []
	await filenames.map(async (file) =>{
		const content = await import(`../markdown/tours/${file}`)
		tours.push(matter(content.default).data)
	}) */

	const collections = []

	if (targetFile === null){
		return {collections}
	}

	const mainPage = await import(`../markdown/${targetFile}`)
	const {data, body} = matter(mainPage.default)
	return {data, body, collections}
}

export default propRetrieval


