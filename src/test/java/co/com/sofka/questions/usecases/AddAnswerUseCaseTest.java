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

class AddAnswerUseCaseTest {
    AnswerRepository answerRepository;
    MapperUtils mapperUtils;
    GetAnswerUseCase getAnswerUseCase;
    UpdateAnswerUseCase updateAnswerUseCase;
    CalculateAnswerPositionsUseCase calculateAnswerPositionsUseCase;
    GetUseCase getUseCase;
    QuestionRepository questionRepository;

    @BeforeEach
    public void setup() {
        mapperUtils = new MapperUtils();
        answerRepository = mock(AnswerRepository.class);
        questionRepository = mock(QuestionRepository.class);

        getAnswerUseCase = new GetAnswerUseCase(mapperUtils, answerRepository);
        updateAnswerUseCase = new UpdateAnswerUseCase(mapperUtils, answerRepository, getAnswerUseCase);
        getUseCase = new GetUseCase(mapperUtils,questionRepository, answerRepository);
        calculateAnswerPositionsUseCase = new CalculateAnswerPositionsUseCase(getUseCase, updateAnswerUseCase);
    }

    @Test
    public void addAnswerUseCase()
    {
        var answer = getAnswerData();
        var question = getQuestionData();
        when(answerRepository.save(Mockito.any())).thenReturn(Mono.just(answer).map(mapperUtils.mapperToAnswer()));
        when(questionRepository.findById("qqqq")).thenReturn(Mono.just(question).map(mapperUtils.mapperToQuestion(question.getId())));
        when(answerRepository.findAllByQuestionId("qqqq")).thenReturn(Flux.just(answer).map(mapperUtils.mapperToAnswer()));

        var addAnswer = new AddAnswerUseCase(mapperUtils, getUseCase,answerRepository);

        StepVerifier.create(addAnswer.apply(answer))
                .expectNextMatches(questionDTO ->
                {
                    return questionDTO.getAnswers().contains(answer);
                }).verifyComplete();
    }

    AnswerDTO getAnswerData()
    {
        var answer = new AnswerDTO("qqqq", "uuuu", "answer1");
        answer.setId("xxxx");
        answer.setQuestionId("qqqq");
        answer.setDecrease(new ArrayList<>());
        answer.setIncrease(new ArrayList<>());
        return answer;
    }
    QuestionDTO getQuestionData()
    {
        var question = new QuestionDTO();
        question.setId("qqqq");

        return question;
    }
}