package co.com.sofka.questions.usecases;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class DecreaseUseCase {
    private final GetAnswerUseCase getAnswerUseCase;
    private final UpdateAnswerUseCase updateAnswerUseCase;
    private final MapperUtils mapperUtils;

    public DecreaseUseCase(GetAnswerUseCase getAnswerUseCase, UpdateAnswerUseCase updateAnswerUseCase,
                           MapperUtils mapperUtils) {
        this.getAnswerUseCase = getAnswerUseCase;
        this.updateAnswerUseCase = updateAnswerUseCase;
        this.mapperUtils = mapperUtils;
    }

    public Mono<Void> apply(String answerId, String userId) {
        return getAnswerUseCase.apply(answerId)
                .map(mapperUtils.mapperToAnswer())
                .map(answer ->
                {
                    answer.addDecrease(userId);
                    answer.removeIncrease(userId);
                    return answer;
                })
                .map(mapperUtils.mapEntityToAnswer())
                .flatMap(updateAnswerUseCase::apply).then();
    }
}