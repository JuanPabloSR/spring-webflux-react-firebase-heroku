import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { connect } from 'react-redux'


import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const FormPage = ({ dispatch, loading, redirect, userId }) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [textHtml, setTextHtml] = useState('');

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setTextHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };


    const onSubmit = data => {
        data.userId = userId;
        data.question = textHtml;
        dispatch(postQuestion(data));
    };

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])


    const editorStateC = editorState;

    return (
        <section>
            <h1 className='titulo'>Nueva Pregunta</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label for="type">Tipo</label>
                    <select {...register("type")} id="">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label for="category">Categoria</label>
                    <select {...register("category")} id="category">
                        <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>

                    </select>
                </div>

                <div>
                    <label for="question">Pregunta</label>       
                     <Editor
                        editorState={editorStateC}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                    />
                    <div dangerouslySetInnerHTML={{ __html: textHtml }} />
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Guardando ...." : "Guardar"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)