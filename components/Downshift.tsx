// import Downshift from 'downshift'
// import { useEffect, useState } from 'react'
// import styled from 'styled-components'

// const items = [
//   { value: 'apple' },
//   { value: 'pear' },
//   { value: 'orange' },
//   { value: 'grape' },
//   { value: 'banana' },
// ]

// interface DownshiftCustomProps {
//   onChange: Function,
//   placeholder?: string,
// }

// const DownshiftStyled = styled.div`
//   >input.input-style{
//     border:none;
//     font-size: 16px;
//   }
// `

// export const DownshiftCustom = ({ onChange, placeholder }: any) => {
//   const [options, setOptions] = useState([]);
//   const [isLoading, setLoading] = useState(false);

//   const onChangeHandler = (value: any) => {
//     console.log("🚀 ~ file: Downshift.tsx ~ line 27 ~ onChangeHandler ~ value", value)
//   }

//   useEffect(() => { }, [])

//   return (
//     <Downshift
//       onChange={selection => alert(`You selected ${selection.value}`)}
//       itemToString={item => (item ? item.value : '')}
//       onInputValueChange={onChangeHandler}
//     >
//       {({
//         getInputProps,
//         getItemProps,
//         getLabelProps,
//         getMenuProps,
//         isOpen,
//         inputValue,
//         highlightedIndex,
//         selectedItem,
//       }) => (
//         <div>
//           <DownshiftStyled>
//             <input {...getInputProps()} className="input-style" placeholder={placeholder} />
//             <ul {...getMenuProps()}>
//               {isOpen
//                 ? options
//                   .filter(item => !inputValue || item.value.includes(inputValue))
//                   .map((item, index) => (
//                     <li
//                       {...getItemProps({
//                         key: item.value,
//                         index,
//                         item,
//                         style: {
//                           backgroundColor:
//                             highlightedIndex === index ? 'lightgray' : 'white',
//                           fontWeight: selectedItem === item ? 'bold' : 'normal',
//                         },
//                       })}
//                     >
//                       {item.value}
//                     </li>
//                   ))
//                 : null}
//             </ul>
//           </DownshiftStyled>
//         </div>
//       )}
//     </Downshift>
//   )
// }