import { useEffect, useState } from 'react';

import api from '../../services/api';
import { Header } from '../../components/Header';
import {Food} from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';


export interface IFood {
    id : Number
    name : string
    description : string
    price : string
    available : boolean
    image : string
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [foods, setFoods] = useState<IFood[]>([])
  const [editingFood, setEditingFood] = useState<IFood>()


  useEffect(() => {
    async function componentDidMount() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    componentDidMount()
  }, [])

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food: IFood) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  async function handleAddFood(food: IFood) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods((state) => {
        return [...state, response.data]
      })

    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: IFood) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
    
      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

   async function handleDeleteFood(id: Number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered)
  }

  return (
    <>
    <Header openModal={toggleModal} />
    <ModalAddFood
      isOpen={modalOpen}
      setIsOpen={toggleModal}
      handleAddFood={handleAddFood}
    />
    <ModalEditFood
      isOpen={editModalOpen}
      setIsOpen={toggleEditModal}
      editingFood={editingFood}
      handleUpdateFood={handleUpdateFood}
    />

    <FoodsContainer data-testid="foods-list">
      {foods &&
        foods.map(food => (
          <Food
            key={food.id.toString()}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
    </FoodsContainer>
  </>
  )
}

