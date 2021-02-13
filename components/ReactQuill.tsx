import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export function ReactQuillForm(props: any) {
  return (
    <ReactQuill formats={ReactQuillConfigs.formats} modules={ReactQuillConfigs.modules} {...props} />
  )
}


export const ReactQuillConfigs = {
  formats: [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
  ],
  modules: {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ]
  }
}