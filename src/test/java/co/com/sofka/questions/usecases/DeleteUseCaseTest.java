package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
@RunWith(MockitoJUnitRunner.class)

class DeleteUseCaseTest {
    QuestionRepository questionRepository;
    MapperUtils mapperUtils;
    AnswerRepository answerRepository;

    @BeforeEach
    public void setup() {
        mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
    }
    @Test
    public void deleteQuestion()
    {
        var deleteQuestion = new DeleteUseCase(answerRepository, questionRepository);
        var question = getQuestionData();
        var answer = getAnswerData();
        when(questionRepository.findById("xxxx")).thenReturn(Mono.just(question).map(mapperUtils.mapperToQuestion(question.getId())));
        when(answerRepository.findAllByQuestionId("xxxx")).thenReturn(Flux.just(answer).map(mapperUtils.mapperToAnswer()));
        when(questionRepository.deleteById("xxxx")).thenReturn(Mono.empty());
        StepVerifier.create(deleteQuestion.apply("xxxx")
        );
    }
    QuestionDTO getQuestionData()
    {
        var question = new QuestionDTO();
        question.setId("xxxx");
        question.setType("type1");
        question.setCategory("category1");
        return question;
    }
    AnswerDTO getAnswerData()
    {
        var answer = new AnswerDTO("qqqq", "uuuu", "answer1");
        answer.setId("aaaa");
        answer.setQuestionId("qqqq");
        answer.setDecrease(new ArrayList<>());
        answer.setIncrease(new ArrayList<>());
        return answer;
    }
}