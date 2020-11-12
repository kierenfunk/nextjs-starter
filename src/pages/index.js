import Main from '../layouts/Main';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';

export default function Index({data,tours}) {
	return <Main data={data,tours}/>
}

export async function getStaticProps(context) {
  const postsDirectory = path.join(process.cwd(), 'src/markdown/tours');
  const filenames = fs.readdirSync(postsDirectory);

	const tours = []
	await filenames.map(async (file) =>{
		const content = await import(`../markdown/tours/${file}`);
		const data = matter(content.default);
		data.data.slug = file.slice(0,file.length-3);
		tours.push(data.data)
	})
	
	const content = await import('../markdown/home.md');
	const {data} = matter(content.default);
	return {
		props:{data,tours}
	}
}

