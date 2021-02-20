import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const propRetrieval = async (page=null,collections=[]) => {
	collections = await collections.reduce( async (obj,pathName)=>{
		const fileNames = fs.readdirSync(path.join(process.cwd(), `src/markdown/${pathName}`))
		obj[pathName] = await Promise.all(fileNames.map(async (file) =>{
			const content = await import(`../markdown/${pathName}/${file}`)
			return matter(content.default).data
		}))
		return obj
	},{})

	if (page === null){
		return {collections}
	}

	const pageTarget = await import(`../markdown/${page}`)
	const {data} = matter(pageTarget.default)
	return {data, collections}
}

export default propRetrieval


