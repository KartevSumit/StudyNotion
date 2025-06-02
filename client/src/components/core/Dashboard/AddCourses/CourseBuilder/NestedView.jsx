import React, { useState } from 'react';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import SectionModal from './SectionModal';
import {
  deleteSection,
  updateSubSection,
  deleteSubSection,
  addSubSection,
} from '../../../../../services/operations/SectionApi';

function NestedView({ handleChangeSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState(null);
  const [addSection, setAddSection] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCancel = () => {
    setAddSection(null);
    setEditSection(null);
    setViewMode(null);
  };

  const handleAddSection = (sectionId) => {
    console.log(course._id);
    setAddSection({
      sectionId: sectionId,
      courseId: course._id,
      mode: 'add',
    });
  };

  const handleEditSection = (sectionId, subSection) => {
    setEditSection({
      courseId: course._id,
      sectionId: sectionId,
      subSection: subSection,
      mode: 'edit',
    });
  };

  const handleVeiwSection = (sectionId, subSection) => {
    setViewMode({ sectionId: sectionId, subSection: subSection, mode: 'view' });
  };

  const handleDeleteSubSection = (subsectionId, sectionId) => {
    const data = {
      subsectionId: subsectionId,
      sectionId: sectionId,
      courseId: course._id,
    };
    dispatch(deleteSubSection(data, token));
  };

  return (
    <div className="w-full bg-richblack-700 p-6 flex flex-col my-10">
      <style jsx>{`
        .custom-details summary {
          list-style: none;
          cursor: pointer;
        }
        .custom-details summary::-webkit-details-marker {
          display: none;
        }
        .custom-details summary::-moz-list-bullet {
          list-style-type: none;
        }
        .custom-details[open] .arrow-icon {
          transform: rotate(180deg);
        }
        .arrow-icon {
          transition: transform 0.3s ease;
        }
      `}</style>

      <div className="w-full flex flex-col gap-2 text-richblack-300 text-lg">
        {course?.courseContent?.map((section) => (
          <details key={section._id} className="custom-details" open>
            <summary className="w-full flex p-2 border-b-4 border-richblack-600 hover:border-richblack-500 transition-colors group">
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <TbListDetails className="text-yellow-50" />
                  <h1 className="text-richblack-50 font-semibold group-hover:text-richblack-5">
                    {section.sectionName}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEdit
                    className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent details toggle
                      handleChangeSectionName(section._id, section.sectionName);
                    }}
                  />
                  <RiDeleteBin6Line
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent details toggle
                      setConfirmationModal({
                        heading: 'Delete Section',
                        description:
                          'All lectures and sub-sections will be deleted',
                        text1: 'Delete',
                        customClass1: 'bg-pink-600 text-richblack-5',
                        onClick1: () => {
                          deleteSection(
                            section._id,
                            course._id,
                            token,
                            dispatch
                          );
                          setConfirmationModal(null);
                        },
                        text2: 'Cancel',
                        customClass2: 'bg-richblack-700 text-richblack-5',
                        onClick2: () => setConfirmationModal(null),
                      });
                    }}
                    className="cursor-pointer text-richblack-200 hover:text-pink-200 transition-colors"
                  />
                  <div className="border-l-2 border-richblack-300 pl-2">
                    <IoMdArrowDropdown className="arrow-icon text-richblack-200" />
                  </div>
                </div>
              </div>
            </summary>

            <div className="px-8 flex flex-col items-start ">
              {section.subSections?.map((subSection) => (
                <div
                  key={subSection._id}
                  className="w-full cursor-pointer border-b-4 border-richblack-600 mt-2  hover:border-richblack-500 transition-colors flex items-center justify-between"
                >
                  <div className="w-full flex items-center justify-between group text-lg">
                    <div
                      className="flex items-center gap-3 flex-1 p-3"
                      onClick={() => handleVeiwSection(section._id, subSection)}
                    >
                      <TbListDetails className="text-blue-200" />
                      <h1 className="text-richblack-50 text-lg group-hover:text-richblack-5">
                        {subSection.title}
                      </h1>
                    </div>
                    <div className="flex items-center gap-2 p-3">
                      <MdOutlineEdit
                        className="cursor-pointer text-richblack-200 hover:text-yellow-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditSection(section._id, subSection);
                        }}
                      />
                      <RiDeleteBin6Line
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmationModal({
                            heading: 'Delete Section',
                            description:
                              'All lectures and sub-sections will be deleted',
                            text1: 'Delete',
                            customClass1: 'bg-pink-600 text-richblack-5',
                            onClick1: () => {
                              handleDeleteSubSection(subSection._id, section._id);
                              setConfirmationModal(null);
                            },
                            text2: 'Cancel',
                            customClass2: 'bg-richblack-700 text-richblack-5',
                            onClick2: () => setConfirmationModal(null),
                          });
                        }}
                        className="cursor-pointer text-richblack-200 hover:text-pink-300 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-3 px-3 py-1 mt-2 rounded-2xl text-yellow-50 hover:shadow-sm hover:shadow-yellow-5 transition-all ease-in-out"
                onClick={() => handleAddSection(section._id)}
              >
                <IoMdAdd />
                <span>Add Lecture</span>
              </button>
            </div>
          </details>
        ))}
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {addSection && (
        <SectionModal
          text="Add Section"
          defaultValues={addSection}
          handleCancel={handleCancel}
        />
      )}
      {editSection && (
        <SectionModal
          text="Edit Section"
          defaultValues={editSection}
          handleCancel={handleCancel}
        />
      )}
      {viewMode && (
        <SectionModal
          text="View Section"
          defaultValues={viewMode}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default NestedView;
