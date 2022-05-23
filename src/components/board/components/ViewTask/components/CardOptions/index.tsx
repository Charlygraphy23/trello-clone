import CheckListSection from 'core/CheckListSection';
import DropDown from 'core/DropDown';
import LabelSelection from 'core/LabelSelection';
import MemberSelection from 'core/MemberSelection';
import MoveCardSection from 'core/MoveCardSection';

const CardOptions = () => (
  <div className='cardOptions'>
    <p className='cardOptions__title'>Add to Card</p>

    <DropDown
      title='Members'
      buttonId='Members-dropdown-button'
      buttonClass='cardOptions__button'
      buttonText='Members'
      icon={<i className='bi bi-person' />}
    >
      <MemberSelection />
    </DropDown>
    <DropDown
      title='Labels'
      buttonId='Labels-dropdown-button'
      buttonText='Labels'
      buttonClass='cardOptions__button'
      icon={<i className='bi bi-tag' />}
    >
      <LabelSelection clickOnEdit />
    </DropDown>

    <DropDown
      title='Checklist'
      buttonId='Checklist-dropdown-button'
      buttonText='Checklist'
      buttonClass='cardOptions__button'
      icon={<i className='bi bi-list-check' />}
    >
      <CheckListSection />
    </DropDown>

    <br />
    <p className='cardOptions__title'>Actions</p>

    <DropDown
      title='Move'
      buttonId='Move-dropdown-button'
      buttonText='Move'
      buttonClass='cardOptions__button'
      icon={<i className='bi bi-arrow-right' />}
    >
      <MoveCardSection />
    </DropDown>
  </div>
);

export default CardOptions;
