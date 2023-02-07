import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import { Modal } from '../Modal';
import { IFood } from '../../pages/Dashboard';
import Input from '../Input';

interface IModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  editingFood: IFood | undefined
  handleUpdateFood: (food: IFood) => void
}

export function ModalEditFood({isOpen, setIsOpen, handleUpdateFood, editingFood}: IModalEditFoodProps) {

  async function handleSubmit(data: IFood) {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form  onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
