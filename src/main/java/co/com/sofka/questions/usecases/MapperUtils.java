package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.UserDTO;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class MapperUtils {

    public Function<AnswerDTO, Answer> mapperToAnswer() {
        return updateAnswer -> {
            var answer = new Answer();
            answer.setId(updateAnswer.getId());
            answer.setPosition(updateAnswer.getPosition());
            answer.setQuestionId(updateAnswer.getQuestionId());
            answer.setUserId(updateAnswer.getUserId());
            answer.setAnswer(updateAnswer.getAnswer());
            answer.setIncrease(updateAnswer.getIncrease());
            answer.setDecrease(updateAnswer.getDecrease());
            return answer;
        };
    }

    public Function<QuestionDTO, Question> mapperToQuestion(String id) {
        return updateQuestion -> {
            var question = new Question();
            question.setId(id);
            question.setUserId(updateQuestion.getUserId());
            question.setCategory(updateQuestion.getCategory());
            question.setQuestion(updateQuestion.getQuestion());
            question.setUserId(updateQuestion.getUserId());
            question.setType(updateQuestion.getType());
            return question;
        };
    }

    public Function<UserDTO, User> mapperToUser() {
        return updateUser -> {
            var user = new User();
            user.setId(updateUser.getId());
            user.setName(updateUser.getName());
            user.setLastName(updateUser.getLastName());
            user.setEmail(updateUser.getEmail());
            return user;
        };
    }

    public Function<Question, QuestionDTO> mapEntityToQuestion() {
        return entity -> new QuestionDTO(
                entity.getId(),
                entity.getUserId(),
                entity.getQuestion(),
                entity.getType(),
                entity.getCategory()
        );
    }

    public Function<Answer, AnswerDTO> mapEntityToAnswer() {
        return entity -> {
            var answerdto = new AnswerDTO(
                    entity.getQuestionId(),
                    entity.getUserId(),
                    entity.getAnswer()
            );
            answerdto.setId(entity.getId());
            answerdto.setIncrease(entity.getIncrease());
            answerdto.setDecrease(entity.getDecrease());
            answerdto.setPosition(entity.getPosition());
            return answerdto;
        };
    }

    public Function<User, UserDTO> mapEntityToUser() {
        return entity -> {
            var userdto = new UserDTO(

            );
            userdto.setId(entity.getId());
            userdto.setName(entity.getName());
            userdto.setLastName(entity.getLastName());
            userdto.setEmail(entity.getEmail());
            return userdto;
        };
    }
}
