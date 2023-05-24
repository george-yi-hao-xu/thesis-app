import mapBrick from '../assets/mapBrick.png';
import Food from '../Components/Food';
import Cart from '../Components/Cart';
import {Food as FoodClass} from '../Stores/Food';
import {Cart as CartClass} from '../Stores/Cart';
import FoodJSONList, {foodJSON} from '../Data/Foods';
// import {observer} from "mobx-react";
import JoySticker2 from "../Components/JoySticker2";
import CartShoppingList from "../Components/CartShoppingList";
import {observer} from "mobx-react";

function initFoodList(){
    // initialize food list HERE
    const foodObjList:FoodClass[] = [];

    const windowWidth:number = window.innerWidth;
    const windowHeight:number = window.innerHeight;
    const numOfFood:number = FoodJSONList.length;
    const numOFGrade:number = numOfFood + 2;
    const unitWidth:number = windowWidth / numOFGrade;
    const unitHeight:number = windowHeight / numOFGrade;

    FoodJSONList.forEach((food:foodJSON) => {
        const indexX:number = Math.floor(Math.random() * numOfFood + 1);
        const indexY:number = Math.floor(Math.random() * numOfFood + 1);
        const newFoodObj = new FoodClass(food.id, food.name, unitWidth * indexX,unitHeight * indexY, food.srcImg);
        foodObjList.push(newFoodObj);
        return null;
    });
    return foodObjList;
}
const foodObjList:FoodClass[] = initFoodList();
const cartObj:CartClass = new CartClass(1,100,100,"https://www.freeiconspng.com/thumbs/cart-icon/shopping-cart-icon-19.png");

export const Shopping = () => {
    return(
        <>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    background: `url(${mapBrick})`,
                    backgroundSize: 'cover',
                    }}
            />
            {/* foods */}
            {foodObjList.map((foodObj:FoodClass) => {
                return (
                    <Food key={foodObj.fid} food={foodObj} />
                )})}
            {/* Cart */}
            <Cart
                id={'cart01'}
                CartObj={cartObj}
                foodsListenOn={foodObjList}
            />
            <CartShoppingList cartObj={cartObj} clickFn={(foodid:string,cartObj:CartClass)=>{
                // console.log('click');
                const foodObj = foodObjList.find((food:FoodClass) => food.fid === foodid)
                if(!foodObj) return;
                //move cart first to avoid trigger isClose
                cartObj.offsetPos(0,100);
                foodObj.preventReAdding();
                foodObj.setDisplay(true);
                cartObj.removeFood(foodid);
            }
            }/>
            {/*<JoySticker />*/}
            <JoySticker2
                movementFn={cartObj.addMovement}
                leaveFn={cartObj.clearMovement}
            />
        </>
    )
}

export default observer(Shopping);