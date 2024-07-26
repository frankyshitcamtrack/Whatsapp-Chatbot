import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import classes from "./campaign.module.css"

function Campaign() {
     
    return (  
     
        <form className={classes.form_container}> 
           <Input type="text" name="nom" placeholder="Saisissez le nom de votre campagne" className={classes.input}/>
           <Select name="type" className={`${classes.input} ${classes.select_input}`}  optionStyle={classes.option_style} defaultOption="Sélectionnez le type de campagne" options={['option1','option2','option3']}/>
           <Select name="cible" className={`${classes.input} ${classes.select_input}`} optionStyle={classes.option_style} defaultOption="Sélectionnez la cible" options={['option1','option2','option3']}/>
           <TextArea id="content" name="contenu" className={classes.content}  placeholder="Saisissez le contenu du message" rows={20} />
           <div className={classes.btn}>
            <span>
            <input type="file" id="file_submit" hidden/>
            <label for="file_submit">Choisir un fichier</label>
            </span>
            <Button type='button' className={classes.btn_submit}>Envoyez</Button>
           </div>
        </form>
      
    );
}

export default Campaign;