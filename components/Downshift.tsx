import Downshift, { ControllerStateAndHelpers } from 'downshift'
// import { debug } from 'debug'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getTags } from '../api/blog'
import { fetchBase } from '../api/fetchBase'
import { debounce } from '../helpers/functions'

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
]

interface DownshiftCustomProps {
  onChange: Function,
  placeholder?: string,
  values: ValueTypes[],
}

const DownshiftStyled = styled.div`
  input.input-style{
    border:none;
    font-size: 16px;
  }
  
  div.selected-values {
    span{
      border: 1px solid purple;
      color: purple;
      padding: 3px 5px;
      margin-right: 5px;
      cursor: pointer;
      user-select: none;

      &:hover{
        background-color: #eee;
      }
      &:active{
        background-color: purple;
        color: white;
      }
    }
  }

  div.options-container{
    position: relative;
    ul{
      position: absolute;
      background-color: white;
      border: 1px solid #aaa;
      z-index: 2;
      margin: 10px 0;
      padding: 0;
      width: max-content;

      li{
        white-space: nowrap;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        list-style: none;
        padding: 5px 12px;
        cursor: pointer;
      }
    }
  }
`

interface ValueTypes {
  text: string,
  value: string,
}

interface TagDataTypes {
  _id: string,
  name: string,
  slug: string,
}

export const DownshiftCustom = ({ onChange, placeholder, values: passedValues }: DownshiftCustomProps) => {
  const [inputText, setInputText] = useState("");
  const [values, setValues] = useState<ValueTypes[]>(passedValues);
  const [options, setOptions] = useState<TagDataTypes[]>([]);


  const onChangeHandler = async (typedValue: string, { clearSelection, closeMenu }: ControllerStateAndHelpers<TagDataTypes>) => {
    const value = typedValue;

    if (!value.trim()) return setOptions([]);
    if (value.trim().length < 3) return;
    if (value.charAt(value.length - 1) === ",") {
      const trimmedValue = value.substring(0, value.length - 1).trim();
      if (trimmedValue === "" || trimmedValue.length < 3) {
        return setTimeout(() => {
          clearSelection();
          setInputText("");
        });
      }
      if (values.find(({ text }) => text.toLowerCase() === trimmedValue.toLowerCase())) {
        setInputText("");
        return clearSelection();
      }
      try {
        const respTag = await getTags({ search: trimmedValue });
        if (respTag.success) {
          const findTag: TagDataTypes = respTag.data.find((value: TagDataTypes) => value.name.toLowerCase() === trimmedValue.toLocaleLowerCase());
          if (findTag) {
            const newValues = [
              ...values, {
                text: findTag.name,
                value: findTag._id,
              }];
            setValues(newValues);
            onChange(newValues)
            setInputText("");
            setOptions([]);
            clearSelection();
            closeMenu();
            return;
          } else {
            const newValues = [
              ...values,
              {
                text: value.trim().substring(0, value.trim().length - 1),
                value: ''
              }];
            setValues(newValues);
            onChange(newValues)
          }
        }
      } catch (error) {
        console.error(error);
      }

      return setTimeout(() => {
        setInputText("");
        setOptions([]);
        clearSelection();
      });
    }


    return debounce(() => {
      getTags({ search: value.trim() })
        .then(res => {
          if (res.success) {
            const filteredOptions = (res.data as TagDataTypes[])
              .filter(option => values
                .every(selectedValue => selectedValue.text.toLowerCase() !== option.name.toLowerCase()));
            setOptions(filteredOptions);
            // openMenu();
          }
        })
    }, 500)()
  }

  useEffect(() => { }, [])

  const onDeleteHandler = (tag: ValueTypes, idx?: number) => () => {
    const newValues = values.filter((savedTag: ValueTypes) => savedTag.value && tag.value
      ? savedTag.value !== tag.value
      : savedTag.text !== tag.text);
    setValues(newValues);
  }

  const onSelectionHandler = (value: TagDataTypes | null, { clearSelection }: ControllerStateAndHelpers<TagDataTypes>) => {
    if (value) {
      setValues([...values, { text: value.name, value: value._id }]);
      setOptions([])
      clearSelection();
      onChange(values);
      setInputText("")
    }
  }

  return (
    <Downshift
      onChange={onSelectionHandler}
      itemToString={(option: TagDataTypes | null) => option ? option.name! : ""}
      onInputValueChange={onChangeHandler}
      inputValue={inputText}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        clearSelection,
        closeMenu
      }) => (
        <div>
          <DownshiftStyled>
            <div style={{ display: 'flex' }}>
              <div className="selected-values">
                {values.map((value: ValueTypes, idx) => (
                  <span onClick={onDeleteHandler(value)} key={idx}>{value.text}</span>
                ))}
              </div>
              <input
                {...getInputProps({
                  onChange: ({ target }) => {
                    setInputText(target.value);
                  }
                })}
                className="input-style"
                placeholder={placeholder}
              />
            </div>
            <div className="options-container">
              {isOpen && options.filter(option => option.name.toLowerCase().includes(inputValue!.toLowerCase())) &&
                <ul {...getMenuProps()}>
                  {options
                    // .filter(option => values.find(value => value.text.toLowerCase() !== option.name.toLowerCase()))
                    // .filter((option: TagDataTypes) => values.every(value => (value.value !== option._id) || (value.text.toLowerCase()) !== inputValue?.toLowerCase()))
                    .map((option: TagDataTypes, index) => (
                      <li
                        {...getItemProps({
                          key: option._id,
                          index,
                          item: option,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === option ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {option.name}
                      </li>
                    ))
                  }
                </ul>}
            </div>
          </DownshiftStyled>
        </div>
      )}
    </Downshift>
  )
}