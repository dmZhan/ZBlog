type Post = {
  frontMatter: {
    date?: string;
    title?: string;
    tags?: string[];
    description?: string;
  };
  regularPath: string;
};

export function useYearSort(post: Post[]): Post[][] {
  const data = [];
  let year = "0";
  let num = -1;
  for (let index = 0; index < post.length; index++) {
    const element = post[index];
    if (element!.frontMatter.date) {
      const y = element!.frontMatter.date.split("-")[0];
      if (y === year) {
        data[num].push(element);
      } else {
        num++;
        data[num] = [] as any;
        data[num].push(element);
        year = y as string;
      }
    }
  }
  return data;
}

export function formatDateOne(t: string) {
  const date = new Date(t)
  date.setUTCHours(12)

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

export function formatDateTwo(t: string) {
  const date = new Date(t)
  
  return date.toLocaleDateString('en-GB').split('/').reverse().join('-')
}
