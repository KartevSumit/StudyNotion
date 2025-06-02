import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';

function TagInput({
  register,
  setValue,
  getValues,
  errors,
  name,
  required = true,
}) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse && course) {
      const existing = course.tags || [];
      if (Array.isArray(existing)) {
        setTags(existing);
        console.log('Existing tags:', existing);
      }
    }
  }, [editCourse, course, getValues, name]);

  useEffect(() => {
    setValue(name, tags);
    register(name, {
      required: required ? 'Course tags are required' : false,
      validate: (value) => {
        if (required && (!value || value.length === 0)) {
          return 'At least one tag is required';
        }
        return true;
      },
    });
  }, [tags, setValue, name, register, required]);

  const addTag = (tagText) => {
    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.includes(',')) {
      const newTags = value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      newTags.forEach((tag) => addTag(tag));
      setInputValue('');
      return;
    }
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <label htmlFor={name} className="flex flex-col w-full gap-2">
      <h1 className="text-richblack-5 text-xl">
        Tags{required && <sup className="text-pink-200 text-xl">*</sup>}
      </h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-yellow-200 text-richblack-900 px-3 py-1 rounded-full text-lg border border-richblack-500"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:bg-richblack-500 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <X
                  size={14}
                  className="text-richblack-900 hover:text-richblack-100"
                />
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        className="bg-richblack-700 rounded-lg p-2 h-12 text-lg text-richblack-5"
        placeholder="Enter tags and press enter or use comma to separate"
      />

      {errors[name] && (
        <span className="text-pink-200 text-sm">{errors[name].message}</span>
      )}
    </label>
  );
}

export default TagInput;
